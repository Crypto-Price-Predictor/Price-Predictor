import pandas as pd # type: ignore
import numpy as np # type: ignore
import joblib # type: ignore
from sklearn.preprocessing import MinMaxScaler,StandardScaler # type: ignore
from fetch_data import fetch_data
import ta # type: ignore
import ta.momentum # type: ignore

scaler = MinMaxScaler()

def load_data(start_date, end_date, coin, api_key):
    data = fetch_data(start_date, end_date, coin, api_key)
    print(data.head())
    return data

def preprocess_data(df):
    # Create a DataFrame with 7 rows of None (or NaN) values
    none_rows = pd.DataFrame([[None] * df.shape[1]] * 7, columns=df.columns)

    # Append the None rows to the original DataFrame
    df = pd.concat([df, none_rows], ignore_index=True)
    
    df['pre_7'] = df['close'].shift(7)
    df['pre_8'] = df['close'].shift(8)
    df['pre_9'] = df['close'].shift(9)
    df['pre_10'] = df['close'].shift(10)
    df['pre_11'] = df['close'].shift(11)

    df['pre_price'] = df['close'].shift(7)
    df['pre_vol'] = df['volumeto'].shift(7)
    
    df = df.fillna(0)
    df = df.drop(columns=['conversionType', 'conversionSymbol'])
    
    df1 = pd.DataFrame()

    df1['actual'] = df['close']

    df1['pre_7'] = df['pre_7']
    df1['pre_8'] = df['pre_8']
    df1['pre_9'] = df['pre_9']
    df1['pre_10'] = df['pre_10']
    df1['pre_11'] = df['pre_11']

    df1['pre_price'] = df['pre_price']
    df1['pre_vol'] = df['pre_vol']
    
    df1['RSI'] = ta.momentum.RSIIndicator(df1['pre_price'], window=14).rsi()
    df1['STOCHRSI'] = ta.momentum.StochRSIIndicator(df1['pre_price'], window=14).stochrsi()
    df1['MACD'] = ta.trend.MACD(df1['pre_price'], window_slow=26, window_fast=12, window_sign=9).macd()
    df1['Highs/Lows'] = ta.trend.DPOIndicator(df1['pre_price'], window=14).dpo()
    df1['ROC'] = ta.momentum.ROCIndicator(df1['pre_price'], window=12).roc()
        
    df1['SMA7'] = df1['pre_price'].rolling(window=7).mean()
    df1['SMA2'] = df1['pre_price'].rolling(window=2).mean()
    df1['SMA14'] = df1['pre_price'].rolling(window=14).mean()
    df1['SMA21'] = df1['pre_price'].rolling(window=21).mean()
    df1['SMA28'] = df1['pre_price'].rolling(window=28).mean()
    
    df1 = df1.dropna()
    df1 = df1.reset_index(drop=True)
    col = ['SMA2','SMA7','SMA14','SMA21','SMA28','pre_7','pre_8','pre_9','pre_10','pre_11','pre_vol','STOCHRSI','MACD','Highs/Lows','ROC']
    
    X_test = df1[col][-7:]    
    return X_test

def create_dataset(dataset, look_back=1, n=0, future_steps=1):
    dataX, dataY = [], []
    for i in range(len(dataset) - look_back - future_steps - n):
        a = dataset[i:(i + look_back), 0]
        dataX.append(a)
        dataY.append(dataset[i + look_back + n:i + look_back + n + future_steps, 0])
    return np.array(dataX), np.array(dataY)

def split_data(data, look_back, future_steps):
    np.random.seed(0)

    # Load the dataset
    dataframe = data
    dataset = dataframe.values
    dataset = dataset.astype('float64').reshape(-1, 1)

    dataset = scaler.fit_transform(dataset)
    
    joblib.dump(scaler, './server/models/scaler_TRX.pkl')

    train_size = int(len(dataset) * 0.67)
    train, test = dataset[0:train_size, :], dataset[train_size:len(dataset), :]

    # Create dataset for multiple future steps
    trainX, trainY = create_dataset(train, look_back, 0, future_steps)
    testX, testY = create_dataset(test, look_back, 0, future_steps)

    # Reshape input to be [samples, time steps, features]
    trainX = np.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
    testX = np.reshape(testX, (testX.shape[0], 1, testX.shape[1]))
    return trainX,trainY,testX,testY
