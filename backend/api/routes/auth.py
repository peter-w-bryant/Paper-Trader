# WTForms just for testing
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

# Path: backend\api\routes\auth.py
from flask import Blueprint, jsonify, current_app, render_template, redirect, url_for, request, flash
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user # for handling user sessions
from flask_bcrypt import Bcrypt # for hashing passwords
from flask_sqlalchemy import SQLAlchemy

auth = Blueprint('auth', __name__) # blueprint for auth routes

from app import bcrypt, login_manager # import bcrypt and login_manager from app.py
from db import db
from models import User

@auth.route('/')
def home():
    return render_template('home.html')