from flask import Flask, request, jsonify # type: ignore
from fetch_data import fetch_data
import numpy as np # type: ignore
import joblib # type: ignore
from train import forward

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    layers = joblib.load('./models/model.pkl')
    scaler_x = joblib.load('./models/scaler_x.pkl')
    
    # Get data from the request
    data = fetch_data()
    
    # Transform the data
    data[['Close', 'Volume USDT']] = scaler_x.transform(data[['Close', 'Volume USDT']])
    
    data = data.iloc[1:,:].values.reshape(30,2)

    # Make predictions
    _,predictions = forward(data, layers)
    
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True)