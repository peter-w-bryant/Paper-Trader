from flask import Blueprint, jsonify, current_app, request
import json
import os
from datetime import datetime
from yahoo_fin.stock_info import get_data, get_live_price

stocks = Blueprint('stocks', __name__)

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

