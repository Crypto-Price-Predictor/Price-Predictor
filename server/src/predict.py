from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from fetch_data import fetch_data
from datetime import datetime, timedelta
import numpy as np # type: ignore
import joblib # type: ignore

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['GET'])
def predict():
    
    param1 = request.args.get('coin', type=str)
    
    end_date = datetime.now()  # Current date
    start_date = end_date - timedelta(days=5)  # 4 days before now

    api_key = '89c98780049c75a3fd8b0eb86678497b7c1bdc79527b30b59ecdce5e583d6333'

    # Fetch SHIB data
    data = fetch_data(start_date, end_date, param1, api_key) 
    
    # Get data from the request
    dataset = data.values.astype('float64').reshape(-1,1)
    
    try:
        if param1 == 'BTC':
            model = joblib.load('../../server/models/model_BTC.pkl')
            scaler = joblib.load('../../server/models/scaler_BTC.pkl')
        elif param1 == 'SHIB':
            model = joblib.load('../../server/models/model_1.pkl')
            scaler = joblib.load('../../server/models/scaler_1.pkl')
        elif param1 == 'TRX':
            model = joblib.load('../../server/models/model_TRX.pkl')
            scaler = joblib.load('../../server/models/scaler_TRX.pkl')
        else:
            return jsonify({"error": "Unsupported coin"}), 400

        dataset = scaler.transform(dataset).reshape(1, 1, 4)
        future_predictions = model.predict(dataset)
        future_predictions = scaler.inverse_transform(future_predictions)

        return jsonify(future_predictions.tolist())
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
    # Make predictions
    # dataset = scaler.transform(dataset).reshape(1,1,3)
    # future_predictions = model.predict(dataset)
    
    # return jsonify(future_predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True)