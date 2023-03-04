from flask import Blueprint, jsonify, current_app
import json
import os
import yfinance as yf

stocks = Blueprint('stocks', __name__)

# import from resources/all_tickers.json
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file_path = os.path.join(BASE_DIR, 'resources', 'all_tickers.json')

@stocks.route('/all-tickers', methods=['GET'])
def get_all_tickers():
    """Returns JSON of all tickers"""
    print('get_all_tickers()')
    with open(file_path, 'r') as f:
        all_tickers = json.load(f)
    return jsonify(all_tickers)
