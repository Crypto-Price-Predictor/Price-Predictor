import pandas as pd # type: ignore
import numpy as np # type: ignore
import joblib # type: ignore
from sklearn.preprocessing import StandardScaler # type: ignore

Predictors = ["Close", "Volume USDT"]
Target = ["Close_tomorrow"]

scaler_x = StandardScaler()
# scaler_y = StandardScaler()

def load_data(filepath):
    return pd.read_csv(filepath)

def preprocess_data(data):
    data = data.iloc[::-1].reset_index(drop=True)
    data["Open_tomorrow"] = data["Open"].shift(-1)
    data["High_tomorrow"] = data["High"].shift(-1)
    data["Low_tomorrow"] = data["Low"].shift(-1)
    data["Close_tomorrow"] = data["Close"].shift(-1)
    data["volumeS_tomorrow"] = data["Volume SHIB"].shift(-1)
    data["volumeU_tomorrow"] = data["Volume USDT"].shift(-1)
    data["trdcount_tomorrow"] = data["tradecount"].shift(-1)
    data = data.dropna(subset=['Open_tomorrow'])
    data = data.set_index('Date')
    data = data.drop(columns = ["Unix", "Symbol"], axis=1)
    
    data[Predictors] = scaler_x.fit_transform(data[Predictors])
    # Save the fitted scaler
    joblib.dump(scaler_x, './models/scaler_x.pkl')
    # data[Target] = scaler_y.fit_transform(data[Target])
    
    return data

def split_data(data):
    np.random.seed(0)
    X = []
    Y = []
    sequence = 30
    n = 7
    for i in range(data.shape[0]- sequence - (n-1)):
        X.append(data[Predictors].iloc[i:(i+sequence),:].values.reshape(sequence, 2))
        Y.append(data[Target].iloc[i+(n-1):(i+sequence+n-1),:].values.reshape(sequence, 1))

    X = np.array(X)
    Y = np.array(Y)
    return X,Y


# if __name__ == "__main__":
#     scaler_x