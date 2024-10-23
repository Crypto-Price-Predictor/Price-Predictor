from datetime import datetime, timedelta
from flask import request
from fetch_data import fetch_data

setHistory = False
api_key = '89c98780049c75a3fd8b0eb86678497b7c1bdc79527b30b59ecdce5e583d6333'
param1 = request.args.get('coin', type=str)
# history_dict[param1] = joblib.load(f'../../server/history/{param1}.pkl')
# joblib.dump(dataset[param1],f'../../server/data/{param1}.pkl')

end_date = datetime.now()  # Current date
start_date = end_date - timedelta(days=4)  # 4 days before now

if (end_date.hour <= 5):
    start_date = end_date - timedelta(days=5)
    setHistory = True

# Fetch data
data = fetch_data(start_date, end_date, param1, api_key)
print(data.tail()) 