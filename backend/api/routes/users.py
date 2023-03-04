from flask import Blueprint, jsonify, current_app, request
import json
import os

from db import db
from models import User

users = Blueprint('users', __name__)

@users.route('/user-info/<user_id>', methods=['GET'])
def get_user_info(user_id):
    user = User.query.filter_by(UID=user_id).first()
    return jsonify(
        id=user.get_id(),
        username=user.get_username(),
    )