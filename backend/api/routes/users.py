from flask import Blueprint, jsonify, current_app, request
import json
import os
from datetime import datetime
from yahoo_fin.stock_info import get_data, get_live_price
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user # for handling user sessions

users = Blueprint('users', __name__)

from app import bcrypt, login_manager # import bcrypt and login_manager from app.py
from db import db
from models import User, Orders

@users.route('/execute_order', methods=['GET', 'POST'])
@login_required
def execute_order():
    """Executes new order"""
    # ticker = request.args.get('ticker') # TODO
    ticker = 'AAPL' # remove TODO

    # investment = request.args.get('investment') # TODO
    investment = 100 # remove TODO

    UID = current_user.UID # get current user's UID
    balance = current_user.balance # get current user's balance

    if investment > balance:
        return {400: 'Insufficient funds'} # return error message
        
    ticker_current_price = get_live_price(ticker) # get current price of ticker
    share_quantity = investment / ticker_current_price # Calculate number of shares

    # Create new order
    new_order = Orders(
        UID=UID,
        ticker=ticker,
        quantity= share_quantity,
        is_sold=False,
        date=datetime.now()
    )

    # Add new order to db
    db.session.add(new_order)

    # Update user's balance
    user = User.query.filter_by(UID=UID).first()
    user.balance = balance - investment

    # Commit changes to db
    db.session.commit()

    return {200: 'Order executed successfully!'}

@users.route('/user-info/<UID>', methods=['GET'])
def get_user_info(UID):

    user = User.query.filter_by(UID=UID).first()
    if not user:
        return {401: 'Username not found!'}

    user_dict =  {
        'UID': user.UID,
        'username': user.username,
        'email': user.email,
        'balance': user.balance,
        'current_holdings': None,
        'past_holdings': None
    }

    # Get user's holdings
    user_orders = Orders.query.filter_by(UID=UID).all()

    for order in user_orders:
        if not order.is_sold:
            ticker = order.ticker
            quantity = order.quantity
            date = order.date
            current_price = get_live_price(ticker)
            total_value = current_price * quantity

            order_dict = {
                'ticker': ticker,
                'quantity': quantity,
                'date': date,
                'current_price': current_price,
                'total_value': total_value
            }

            if user_dict['current_holdings'] is None:
                user_dict['current_holdings'] = [order_dict]
            else:
                user_dict['current_holdings'].append(order_dict)
        else:
            ticker = order.ticker
            quantity = order.quantity
            date = order.date
            current_price = get_live_price(ticker)
            total_value = current_price * quantity

            order_dict = {
                'ticker': ticker,
                'quantity': quantity,
                'date': date,
                'current_price': current_price,
                'total_value': total_value
            }

            if user_dict['past_holdings'] is None:
                user_dict['past_holdings'] = [order_dict]
            else:
                user_dict['past_holdings'].append(order_dict)

    return user_dict
        
