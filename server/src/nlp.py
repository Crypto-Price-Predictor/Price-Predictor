import requests # type: ignore
import pandas as pd # type: ignore
from urllib.request import urlopen,Request
from bs4 import BeautifulSoup
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def fetch_data_nlp():
    url_api =  'https://finviz.com/quote.ashx?t='	
    keys=['BITO','BTC','ETH']
    
    news_collection = {}
    for key in keys:
        url_final=url_api+ key

        file_request = Request(url=url_final,headers={'user-agent': 'my-app'})	
        response_recieved = urlopen(file_request)

        data_html_components = BeautifulSoup(response_recieved, 'html')
        chart_news=data_html_components.find(id='news-table')
        news_collection[key]=chart_news
        # break

    tokenized_data = []

    for key,chart_news in news_collection.items():
        for row in chart_news.findAll('tr'):
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
            tokenized_data.append([key,date,time,title])



    df=pd.DataFrame(tokenized_data,columns=['key','date','time','title'])

    vader=SentimentIntensityAnalyzer()

    df['compound']=df['title'].apply(lambda title:vader.polarity_scores(title)['compound'])

    df['date']=pd.to_datetime(df.date).dt.date

    print(df)

    df.to_csv('../data/news.csv', index=False)


    return df

if __name__ == "__main__":
    fetch_data_nlp()
