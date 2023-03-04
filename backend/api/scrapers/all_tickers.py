import json
import os
import csv
import time
from selenium_scraper import SeleniumScraper
import sys
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 

def download_nasdaq_csv():
    download_dir_path = os.path.join(BASE_DIR, 'resources')
    url = 'https://www.nasdaq.com/market-activity/stocks/screener'

    with SeleniumScraper(download_dir_path) as scraper:

        scraper.driver.get(url) # Go to the url
        time.sleep(10)          # Wait for page to load

        download_btn_xpath = '/html/body/div[3]/div/main/div[2]/article/div[3]/div[1]/div/div/div[3]/div[2]/div[2]/div/button'

        download_btn = scraper.find_element(download_btn_xpath) # Find download button
        download_btn.click() # Click download button    
        time.sleep(10)
        
        # Rename the file to 'nasdaq.csv'
        new_csv_file_path = os.path.join(download_dir_path, 'nasdaq.csv')

        for file in os.listdir(download_dir_path):
            if "nasdaq" in file and file.endswith('.csv'):
                os.rename(os.path.join(download_dir_path, file), new_csv_file_path)
                break
        
        return new_csv_file_path

def all_nasdaq_tickers():
    # path_to_csv = download_nasdaq_csv()
    path_to_csv = os.path.join(BASE_DIR, 'resources', 'nasdaq.csv')
    file_path = os.path.join(BASE_DIR, 'resources', 'all_tickers.json')
    with open(path_to_csv, 'r') as f:
        with open(file_path, 'w') as f2:
            csv.reader(f).__next__() # Skip the first row
            all_company_data = []

            # Read each row in the csv file
            for row in csv.reader(f):

                # Create a dictionary for each company
                company_dict = {
                    'symbol': row[0],
                    'name': row[1],
                    'last_sale': row[2],
                    'net_change': row[3],
                    'percent_change': row[4],
                    'market_cap': row[5],
                    'country': row[6],
                    'ipo_year': row[7],
                    'volume': row[8],
                    'sector': row[9],
                    'industry': row[10]
                }
                all_company_data.append(company_dict) # Append to list
            json_data = json.dumps(all_company_data,indent=4)  # Convert to json
            f2.write(json_data) # Write to file
    return 'Done'
            
if __name__ == '__main__':
    start = time.time()
    all_nasdaq_tickers()
    end = time.time()
    print(f'Elapsed time: {end - start}')