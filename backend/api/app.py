from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, session
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user # for handling user sessions
from flask_bcrypt import Bcrypt # for hashing passwords
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') 

from db import db # Import db object from db.py
db.init_app(app)  # Initialize db object with app config

bcrypt = Bcrypt() # Bcrypt for hashing passwords
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Routes
from routes.stocks import stocks
from routes.auth import auth
from routes.users import users

with app.app_context():
    # Register blueprints
    app.register_blueprint(stocks) # Stocks blueprint
    app.register_blueprint(auth)   # Auth blueprint
    app.register_blueprint(users)   # Users blueprint

# Models
from models import User, Orders

@login_manager.user_loader
def load_user(UID):
    """Reloads the user object from the user ID stored in the session"""
    return User.query.get(int(UID)) 

if __name__ == '__main__':
    app.run(debug=True)