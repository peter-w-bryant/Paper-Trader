from db import db
from flask_sqlalchemy import SQLAlchemy

from flask_login import UserMixin

class User(db.Model, UserMixin):
    UID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.password}', '{self.email}')"
    
    def get_id(self):
        return self.UID
    
    def get_username(self):
        return self.username
    
    def get_email(self):
        return self.email
    
    def get_all_users(self):
        return User.query.all()
