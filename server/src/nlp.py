import requests  # type: ignore
import pandas as pd  # type: ignore
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup # type: ignore
import nltk # type: ignore
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer # type: ignore

def fetch_data_nlp():
    # Base URL for fetching financial news for specific assets
    url_api = 'https://finviz.com/quote.ashx?t='
    # List of asset symbols to retrieve news for
    keys = ['BITO', 'BTC', 'ETH']
    
    # Dictionary to hold news data by asset symbol
    news_collection = {}
    for key in keys:
        # Construct the final URL for the asset's page
        url_final = url_api + key
        # Set up the request headers
        file_request = Request(url=url_final, headers={'user-agent': 'my-app'})	
        # Retrieve the HTML response
        response_recieved = urlopen(file_request)
        # Parse the HTML with BeautifulSoup
        data_html_components = BeautifulSoup(response_recieved, 'html.parser')
        # Find the news table by its ID and store it in the dictionary
        chart_news = data_html_components.find(id='news-table')
        news_collection[key] = chart_news

    # List to store processed news data
    tokenized_data = []

    # Loop through each asset's news items
    for key, chart_news in news_collection.items():
        # Loop through each row in the news table
        for row in chart_news.findAll('tr'):
            # Extract the news title
            title = row.a.text
            # Extract the timestamp, splitting by space to separate date and time
            time_stamp = row.td.text.split(' ')        
            time_stamp = [item.strip() for item in time_stamp if item.strip()]
            # Check if only date is provided
            if len(time_stamp) == 1:
                date = time_stamp[0]
                time = 'N/A'  # If time is not available, set it as 'N/A'
            else:
                date = time_stamp[0]
                time = time_stamp[1]
            # Append the processed data to the list
            tokenized_data.append([key, date, time, title])

    # Create a DataFrame from the tokenized data
    df = pd.DataFrame(tokenized_data, columns=['key', 'date', 'time', 'title'])

    # Initialize VADER sentiment analyzer
    vader = SentimentIntensityAnalyzer()

    # Apply sentiment analysis to each news title
    df['compound'] = df['title'].apply(lambda title: vader.polarity_scores(title)['compound'])

    # Convert date column to datetime format and keep only the date part
    df['date'] = pd.to_datetime(df.date).dt.date

    # Print the DataFrame
    print(df)

    # Save the DataFrame to a CSV file
    df.to_csv('./data/news.csv', index=False)

    # Return the DataFrame
    return df

if __name__ == "__main__":
    fetch_data_nlp()