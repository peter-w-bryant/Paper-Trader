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

@auth.route('/register', methods=['GET', 'POST']) 
def register():
    if request.method == 'POST': 
        data = request.get_json()
        try:
            hashed_password = bcrypt.generate_password_hash(data['password']) # hash password
            
            new_user = User(username=data['username'], password=hashed_password, # create new user
                            email=data['email'], balance=1e4)
            db.session.add(new_user) # add new user to database
            db.session.commit()      # commit changes to database

            return {201: 'User created successfully!'} # return success message
        except IntegrityError:
            return {409: 'Username already exists!'}   # return error message
       
@auth.route('/login', methods=['GET', 'POST'])
def login():
    # print all users in user tables
    users = User.query.all()
    for user in users:
        print(user.username)
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user != None:
            if bcrypt.check_password_hash(user.password, data['password']):
                login_user(user)
                return {200: 'Logged in successfully!'}
            return {401: 'Incorrect password!'}
        else:
            return {401: 'Username not found!'}
        
@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return {200: 'Logged out successfully!'}