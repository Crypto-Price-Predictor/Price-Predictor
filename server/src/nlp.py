import requests # type: ignore
import pandas as pd # type: ignore
from urllib.request import urlopen,Request
from bs4 import BeautifulSoup
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def fetch_data_nlp():
    url =  'https://finviz.com/quote.ashx?t='	
    tickers=['BITO','BTC','ETH']
    
    news_tables = {}
    for ticker in tickers:
        url_final=url+ ticker

        req = Request(url=url_final,headers={'user-agent': 'my-app'})	
        response = urlopen(req)

        html = BeautifulSoup(response, 'html')
        news_table=html.find(id='news-table')
        news_tables[ticker]=news_table
        # break

    Parsed_data = []

    for ticker,news_table in news_tables.items():
        for row in news_table.findAll('tr'):
            # print (row)
            title=row.a.text
            time_stamp=row.td.text.split(' ')        
            time_stamp = [item.strip() for item in time_stamp if item.strip()]
            # print(date_time)
            if len(time_stamp)==1:
                date=time_stamp[0]
                time='N/A'
            else:           
                date=time_stamp[0]
                time=time_stamp[1]
            Parsed_data.append([ticker,date,time,title])



    df=pd.DataFrame(Parsed_data,columns=['ticker','date','time','title'])

    vader=SentimentIntensityAnalyzer()

    df['compound']=df['title'].apply(lambda title:vader.polarity_scores(title)['compound'])

    df['date']=pd.to_datetime(df.date).dt.date

    print(df)

    df.to_csv('../data/news.csv', index=False)


    return df

if __name__ == "__main__":
    fetch_data_nlp()
