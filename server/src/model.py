from datetime import datetime, timedelta
import numpy as np # type: ignore
from keras.models import Sequential # type: ignore
from keras.layers import Dense, LSTM, Input # type: ignore
from statsmodels.tsa.holtwinters import ExponentialSmoothing  # type: ignore
# from keras.layers import LSTM # type: ignore
from data_preprocessing import load_data, preprocess_data
import joblib # type: ignore


def create_model(data, n, m):
    # model = Sequential()
    # model.add(LSTM(256, return_sequences=True, input_shape=(1, look_back)))
    # model.add(LSTM(256))
    # model.add(Dense(future_steps))  # Change to future_steps

    # model.compile(loss='mean_squared_error', optimizer='adam')  # Change to future_steps
    es = ExponentialSmoothing(data, trend='add').fit(smoothing_level=n, smoothing_trend=m)
    return es

def model(param1, a, api_key):
    model = joblib.load(f'./data/{param1}Model.pkl')
    end_date = datetime.now()  # Current date
    start_date = end_date - timedelta(days=358)
    df = load_data(start_date, end_date, param1, api_key)
    X_test = preprocess_data(df)
    predictions = model.predict(X_test)
    # if isinstance(predictions, np.ndarray):
    #     predictions = predictions.astype('float32') + a  # Add the offset if predictions is numeric
    #     predictions = predictions.tolist()  # Convert to list format
    
    # Return as a 2D list for compatibility with main code
    return predictions + a