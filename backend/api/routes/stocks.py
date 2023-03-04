from flask import Blueprint, jsonify, current_app, request
import json
import os
from datetime import datetime
from yahoo_fin.stock_info import get_data, get_live_price
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user # for handling user sessions


stocks = Blueprint('stocks', __name__)

from app import bcrypt, login_manager # import bcrypt and login_manager from app.py
from db import db
from models import User, Orders

# import from resources/all_tickers.json
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file_path = os.path.join(BASE_DIR, 'resources', 'all_tickers.json')

@stocks.route('/all-tickers', methods=['GET'])
def get_all_tickers():
    """Returns JSON of all tickers"""
    with open(file_path, 'r') as f:
        all_tickers = json.load(f)
    return jsonify(all_tickers)

@stocks.route('/historical-stock-info/<ticker>', methods=['GET'])
def get_historical_stock_info(ticker):
    """Returns JSON of stock info"""
    current_date = datetime.now().strftime('%m/%d/%Y') # today's date
    
    if request.method == 'GET':
        # start_date = request.args.get('start_date') # get start_date from query string
        start_date = '02/01/2023'
        stock_info = get_data(ticker, start_date=f'{start_date}', end_date=f'{current_date}') # get stock info
        stock_info = stock_info.to_json(orient='index') # convert to json
        stock_info = json.loads(stock_info) # convert to dict
        return stock_info
    
@stocks.route('/current_stock_price/<ticker>', methods=['GET'])
def get_current_stock_price(ticker):
    """Returns JSON of current stock info"""
    if request.method == 'GET':
        stock_info = get_live_price(ticker)
        # # Turn stock_info into a dictionary
        stock_info = {
            'current_price': stock_info
        }
        return stock_info
    
@stocks.route('/execute_order', methods=['GET', 'POST'])
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

    return {200: 'Order executed successfully!', 'balance': user.balance} # return success message