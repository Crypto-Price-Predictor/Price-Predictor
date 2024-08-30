import pandas as pd # type: ignore
import numpy as np # type: ignore
import joblib # type: ignore
from sklearn.preprocessing import MinMaxScaler,StandardScaler # type: ignore

scaler = MinMaxScaler()

def load_data(filepath):
    return pd.read_csv(filepath)

def preprocess_data(data):
    data = data.ffill()
    data = data.iloc[::-1].reset_index(drop=True)
    data = data.set_index('Date')
    data = data.drop(columns = ["Unix", "Symbol"], axis=1)
    data = data['Close']
        
    return data

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
