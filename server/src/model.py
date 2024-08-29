from keras.models import Sequential # type: ignore
from keras.layers import Dense, LSTM, Input # type: ignore
# from keras.layers import LSTM # type: ignore


def create_model(look_back, future_steps):
    model = Sequential()
    model.add(LSTM(256, return_sequences=True, input_shape=(1, look_back)))
    model.add(LSTM(256))
    model.add(Dense(future_steps))  # Change to future_steps

    model.compile(loss='mean_squared_error', optimizer='adam')  # Change to future_steps
    return model