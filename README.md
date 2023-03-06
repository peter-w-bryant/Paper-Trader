# Paper-Trader
 A React and Flask web-based database application that allows users to manage simulated brokerage accounts and track the performance of their trades.

## Usage
In order to run this project locally first clone this repo and step into the project directory,
```bash
git clone https://github.com/peter-w-bryant/Paper-Trader.git
cd Paper-Trader
```
Next we will walk through initializing and running the backend and frontend servers.

### Backend Setup
First, step into the backend directory, create/activate a Python virtual environment, and install all dependencies.

```bash
cd backend
python3 -m venv ./env
env/Scripts/activate
pip install -r requirements.txt
```
Next, initialize a local SQLite DB instance by stepping into the ```/api``` directory and executing the following commands in Python interactive mode,
```bash
cd api
python3
```
now from interactive mode,

```python
> from app import app, db
> with app.app_context():
>    db.create_all()
```
this will create a SQLite DB instance named ```database.db``` in the ```/backend/api/instance``` directory that will be used to store user accounts and all trades/orders that the user makes.

## MadHacks `23 Project Description
### Inspiration
A paper trade is a simulated trade that allows an investor to practice buying and selling without risking real money. We were inspired to make an application where users could make an account and order trades to test their investment performance before they risk their own money trading in real markets. 

### What it does
It provides secure user accounts and a user interface that allows users to manage a simulated brokerage account and monitor the performance of their holdings.

### How we built it
We built it using a backend Flask API to securely store user information in our database and wrote several API routes for user authentication, getting the current stock prices of a given stock ticker and historical data about a given ticker, and for simulating buying and selling of user assets while keeping track of the current balance/spending power of the user accounts and the total value of net assets. The frontend is a React.js application that makes use of these Flask routes to allow the user to search for stock information, execute trades, and visualize their current holdings in the user dashboard.

### Challenges we ran into
We wanted to use the yfinance API for getting current stock prices, but it appears it is unusable due to changes in Yahoo Finance's anti-scraping measures. We were able to access a separate library to get current stock information.

### Accomplishments that we're proud of
We are proud of our search and user dashboard interfaces, as well as our ability to handle logged-in user sessions and our ability to maintain user records.

### What we learned
We learned what it is like to come up with an idea and design and try and implement it from scratch within 24 hours!

### What's next for Paper Trader
We would like to upgrade the UI and make it look much cleaner. We would also want to have more distinct confirmation for executed orders and have a better way of representing the current user's net value of assets over time.
