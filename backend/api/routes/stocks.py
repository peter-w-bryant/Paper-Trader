from flask import Blueprint, jsonify, current_app
import json
import os
import yfinance as yf

stocks = Blueprint('main', __name__)

@stocks.route('/all-tickers', methods=['GET'])
def get_all_tickers():
    # TODO: Get all tickers from database
    return "todo"