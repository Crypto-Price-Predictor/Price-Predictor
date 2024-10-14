from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from fetch_data import fetch_data
from model import create_model
from datetime import datetime, timedelta
import numpy as np # type: ignore
import joblib # type: ignore

app = Flask(__name__)
CORS(app)

# Initialize a dictionary to hold the history for each coin
history_dict = {
    'BTC': [],
    'SHIB': [],
    'TRX': []
}

history_set_dict = {
    'BTC': {'set':False, 'date':datetime.now()},
    'SHIB': {'set':False, 'date':datetime.now()},
    'TRX': {'set':False, 'date':datetime.now()}
}

dataset = {
    'BTC': [],
    'SHIB': [],
    'TRX': []
}

@app.route('/predict', methods=['GET'])
def predict():
    
    api_key = '89c98780049c75a3fd8b0eb86678497b7c1bdc79527b30b59ecdce5e583d6333'
    
    param1 = request.args.get('coin', type=str)
    history_dict[param1] = joblib.load(f'../../server/history/{param1}.pkl')

    history_set_dict = joblib.load(f'../../server/history/set.pkl')
    setHistory = history_set_dict[param1]['set']
    
    end_date = datetime.now()  # Current date
    start_date = end_date - timedelta(days=4)  # 4 days before now
    
    if (end_date.hour <= 5):
        start_date = end_date - timedelta(days=5)
        if (not setHistory) and (datetime.now().date() > history_set_dict[param1]['date'].date()):
            setHistory = True
            history_set_dict[param1]['date'] = datetime.now()

    # Fetch data
    data = fetch_data(start_date, end_date, param1, api_key)
    
    # Get data from the request
    # dataset = data.values.astype('float64').reshape(-1,1)
    actual = data.iloc[-4:].values.astype('float64').reshape(1, 4)
    
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
        joblib.dump(history_set_dict, f'../../server/history/set.pkl')

        return jsonify({
            "future_predictions": future_predictions,
            "actual": actual,
            "history": history_dict[param1]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        

if __name__ == '__main__':
    app.run(debug=True)