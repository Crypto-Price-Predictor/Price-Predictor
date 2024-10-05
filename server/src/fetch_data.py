import requests # type: ignore
import pandas as pd # type: ignore

def fetch_data(start_date, end_date, coin_id, api_key):
    url = 'https://min-api.cryptocompare.com/data/v2/histoday'
    
    # Convert dates to timestamps
    end_timestamp = int(end_date.timestamp())
    # start_timestamp = int(start_date.timestamp())

    params = {
        'fsym': coin_id,  # From Symbol
        'tsym': 'USDT',   # To Symbol
        'toTs': end_timestamp,  # End timestamp
        'limit': 2000,  # Maximum number of days to fetch
        'api_key': api_key  # API key
    }

    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        raise Exception(f"Error fetching data: {response.status_code}, {response.text}")

    data = response.json()

    # Check if 'Data' exists and has 'Data' key
    if 'Data' in data and 'Data' in data['Data']:
        prices = data['Data']['Data']
    else:
        raise Exception("No data returned from the API.")

    # Create a DataFrame from the data
    df = pd.DataFrame(prices)

    # Convert timestamps to datetime
    df['time'] = pd.to_datetime(df['time'], unit='s')

    # Set the timestamp as the index
    df.set_index('time', inplace=True)

    # Filter the DataFrame for the desired date range
    # df = df[(df.index >= start_date) & (df.index <= end_date)]

    # Select only the closing price
    daily_close = df[['close']]

    return daily_close


