from data_preprocessing import load_data, preprocess_data, split_data
from model import create_model
from sklearn.metrics import mean_squared_error # type: ignore
import math
import joblib # type: ignore
import numpy as np  # type: ignore
from sklearn.metrics import root_mean_squared_error # type: ignore
from sklearn.metrics import mean_absolute_percentage_error # type: ignore
from sklearn.metrics import mean_absolute_error # type: ignore

def errors(actual, predict):
    MSE = root_mean_squared_error(predict, actual)
    print(f'MSE: {MSE} ')

    MAE = mean_absolute_error(predict, actual)
    print(f'MAE: {MAE} ')

    MAPE = mean_absolute_percentage_error(predict, actual)
    print(f'MAPE: {MAPE*100}% ')

def evaluate_model(trainX, testX, trainY, testY, model):
    
    trainPredict = model.predict(trainX)
    testPredict = model.predict(testX)
    
    scaler = joblib.load('./server/models/scaler_TRX.pkl')

    # Invert predictions
    trainPredict = scaler.inverse_transform(trainPredict)
    trainY = scaler.inverse_transform(trainY)
    testPredict = scaler.inverse_transform(testPredict)
    testY = scaler.inverse_transform(testY)

    # Calculate root mean squared error for each of the future steps
    trainScore = math.sqrt(mean_squared_error(trainY, trainPredict))
    print('Train Score: %.4f RMSE' % (trainScore))
    testScore = math.sqrt(mean_squared_error(testY, testPredict))
    print('Test Score: %.4f RMSE' % (testScore))
    errors(testY,testPredict)
        

def train_model(filepath):
    look_back = 4
    future_steps = 7
    data = load_data(filepath)
    data = preprocess_data(data)
    trainX,trainY,testX,testY = split_data(data, look_back, future_steps)

    model = create_model(look_back,future_steps)
    
    model.fit(trainX, trainY, epochs=5, verbose=1, shuffle=False, batch_size=50)

    # Save the trained model
    joblib.dump(model, './server/models/model_TRX.pkl')
    
    evaluate_model(trainX,testX, trainY, testY, model)

if __name__ == "__main__":
    train_model('./server/data/Binance_TRXUSDT_d.csv')