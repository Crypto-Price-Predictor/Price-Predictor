import requests # type: ignore
import pandas as pd # type: ignore

def fetch_data(coin_id='shiba-inu', currency='usd'):
    url = f'https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart'
    params = {
        'vs_currency': currency,
        'days': '30',  # Fetch data for the last 30 days
        'interval': 'daily'
    }

    response = requests.get(url, params=params)
    data = response.json()
    
    # Extract prices and timestamps
    prices = data['prices']  # List of [timestamp, price]
    total_volumes = data['total_volumes']  # List of [timestamp, total volume]
    
    # Create a DataFrame
    df = pd.DataFrame({
        'timestamp': [pd.to_datetime(item[0], unit='ms') for item in prices],
        'Close': [item[1] for item in prices],
        'Volume USDT': [item[1] for item in total_volumes]
    })
    
    df = df.set_index('timestamp')
    
    return df
