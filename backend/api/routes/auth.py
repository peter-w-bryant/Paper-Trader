# WTForms just for testing
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

# Path: backend\api\routes\auth.py
from flask import Blueprint, jsonify, current_app, render_template, redirect, url_for, request, flash
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user # for handling user sessions
from flask_bcrypt import Bcrypt # for hashing passwords
from flask_sqlalchemy import SQLAlchemy
# Import sqlalchemy.exc.IntegrityError
from sqlalchemy.exc import IntegrityError

auth = Blueprint('auth', __name__) # blueprint for auth routes

from app import bcrypt, login_manager # import bcrypt and login_manager from app.py
from db import db
from models import User

@auth.route('/')
def home():
    return render_template('home.html')

@auth.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm() # TODO remove
    if request.method == 'POST':
        try:
            hashed_password = bcrypt.generate_password_hash(form.password.data)    # hash password
            new_user = User(username=form.username.data, password=hashed_password) # create new user
            db.session.add(new_user) # add new user to database
            db.session.commit()      # commit changes to database
            # users = User.query.all() # get all users
            return {201: 'User created successfully!'} # return success message
        except IntegrityError:
            return {409: 'Username already exists!'}   # return error message

    return render_template('register.html', form=form)

class RegisterForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        if existing_user_username:
            raise ValidationError(
                'That username already exists. Please choose a different one.')
