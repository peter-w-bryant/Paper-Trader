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
    if request.method == 'POST':
        data = request.get_json()
        ticker = data['ticker'] 
        value = data['value'] 
        ticker_current_price = get_live_price(ticker)
        # If order is a buy order
        if data['order_type'] == 'buy':
            if value > current_user.balance: 
                return 'Insufficient funds', 400 # return error message
            share_quantity = value / ticker_current_price # Calculate number of shares 

            # Create new order
            new_order = Orders(
                UID=current_user.UID,
                ticker=ticker,
                quantity= share_quantity,
                is_sold=False,
                date=datetime.now()
            )
            db.session.add(new_order) # add new order to database

            # Update user's balance
            user = User.query.filter_by(UID=current_user.UID).first()
            user.balance = current_user.balance - value
            db.session.commit() # Commit changes to db
            return 'Purchase executed successfully!', 200
        
        # If order is a sell order
        elif data['order_type'] == 'sell':
            user_orders = Orders.query.filter_by(UID=current_user.UID).all() # Get all user's orders
            cover_orders = [] # List of held orders that can cover the sell order
            cover_amount = 0  # Total value of held orders that can cover the sell order
            can_cover = False # Boolean to check if the sell order can be covered
            for order in user_orders:

                # If the order is the same ticker and is not sold
                if order.ticker == ticker and not order.is_sold:
                    cover_orders.append(order) # Add the order to the list of orders that can cover the sell order
                    cover_amount += order.quantity * ticker_current_price # Add the order's value to the value of orders that can cover the sell order

                    # If the value of orders that can cover the sell order is greater than or equal to the sell order's value
                    if cover_amount >= value:
                        can_cover = True # Set can_cover to True
                        break
            if not can_cover:
                return 'Insufficient shares', 400 # return error message
            # If the sell order can be covered
            elif can_cover:
                for order in cover_orders:
                    while value > 0:
                        # If the order's value is less than or equal to the sell order's value
                        if (order.quantity * ticker_current_price) <= value:
                            value -= order.quantity * ticker_current_price # Subtract the order's value from the sell order's value
                            order.is_sold = True # Set the order's is_sold to True
                            
                        # If the order's value is greater than the sell order's value
                        elif (order.quantity * ticker_current_price) > value:
                            # Subtract the sell order's dollar value from the order's dollar value
                            order.quantity -= value / ticker_current_price
                            value = 0 # Set the sell order's value to 0

                # Update user's balance
                user = User.query.filter_by(UID=current_user.UID).first()
                user.balance = current_user.balance + value
                db.session.commit() # Commit changes to db
                return 'Sale executed successfully!', 200

@users.route('/user-info/<username>', methods=['GET'])
@login_required
def get_user_info(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return 'Username not found!', 404
    
    UID = user.UID

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

    return user_dict, 200
        
