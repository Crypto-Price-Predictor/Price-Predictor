from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from fetch_data import fetch_data
from model import create_model
from datetime import datetime, timedelta
import numpy as np # type: ignore
import joblib # type: ignore
from nlp import fetch_data_nlp
import pandas as pd

app = Flask(__name__)
CORS(app)

# Initialize a dictionary to hold the history for each coin
history_dict = {
    'BTC': [],
    'SHIB': [],
    'TRX': []
}

dataset = {
    'BTC': [],
    'SHIB': [],
    'TRX': []
}

@app.route('/predict', methods=['GET'])
def predict():
    
    setHistory = False
    api_key = '89c98780049c75a3fd8b0eb86678497b7c1bdc79527b30b59ecdce5e583d6333'
    
    param1 = request.args.get('coin', type=str)
    history_dict[param1] = joblib.load(f'../../server/history/{param1}.pkl')
    # joblib.dump(dataset[param1],f'../../server/data/{param1}.pkl')
    
    end_date = datetime.now()  # Current date
    start_date = end_date - timedelta(days=358)  # 4 days before now
    
    if (end_date.hour <= 5):
        start_date = end_date - timedelta(days=359)
        setHistory = True

    # Fetch data
    data = fetch_data(start_date, end_date, param1, api_key)
    print(data.tail()) 
    
    # Get data from the request
    # dataset = data.values.astype('float64').reshape(-1,1)
    # actual = data.iloc[-4:].values.astype('float64').reshape(1, 4)
    actual_dates = data.index[-358:].tolist() 
    actual = data.iloc[-358:].values.astype('float64').reshape(1, 358)
    
    try:
        if param1 == 'BTC':
            # model = joblib.load('../../server/models/model_BTC.pkl')
            # scaler = joblib.load('../../server/models/scaler_BTC.pkl')
            n,m = 0.8, 0.1
        elif param1 == 'SHIB':
            # model = joblib.load('../../server/models/model_1.pkl')
            # scaler = joblib.load('../../server/models/scaler_1.pkl')
            n,m = 0.81, 0
        elif param1 == 'TRX':
            # model = joblib.load('../../server/models/model_TRX.pkl')
            # scaler = joblib.load('../../server/models/scaler_TRX.pkl')
            n,m = 0.75, 0
        else:
            return jsonify({"error": "Unsupported coin"}), 400

        # dataset = scaler.transform(dataset).reshape(1, 1, 4)
        # future_predictions = model.predict(dataset)
        # future_predictions = scaler.inverse_transform(future_predictions)
        model = create_model(data, n, m)
        forecast = model.forecast(steps=7)
        
        future_predictions = forecast.values.astype('float32').reshape(1, 7).tolist()
        future_predictions = [[round(value, 2) for value in row] for row in future_predictions]
        
        # future_predictions = future_predictions.astype(float).tolist()
        actual = actual.astype(float).tolist()

        # Get the next predicted value (index 0)
        next_predicted_value = future_predictions[0][0]

        # Update history for the specific coin
        if(setHistory):
            if len(history_dict[param1]) >= 4:
                history_dict[param1].pop(0)  # Remove the oldest value
            history_dict[param1].append(next_predicted_value)  # Add the new predicted value

        # Optionally save the updated history back to disk
        joblib.dump(history_dict[param1], f'../../server/history/{param1}.pkl')
        future_dates = [(end_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(1, 8)]

        if (end_date.hour <= 5):
            future_dates = [(end_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(0, 7)]

        return jsonify({
            "future_predictions": future_predictions,
            "actual": actual,
            "actual_dates": actual_dates[-358:],
            "future_dates": future_dates,
            "history": history_dict[param1]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        

@app.route('/api', methods=['GET'])
def get_dataframe():
   
    # df = fetch_data_nlp() #####################uncomment this line and comment next line to fetch data from the web
    df = pd.read_csv('../data/news.csv')
    # Convert DataFrame to JSON
    data_json = df.to_json(orient='records')
    return jsonify(data_json)

if __name__ == '__main__':
    app.run(debug=True)
