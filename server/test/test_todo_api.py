import requests # type: ignore

ENDPOINT = "http://127.0.0.1:5000"

# response = requests.get(ENDPOINT)
# response = response.json()
# print(response)

def test_can_call_api():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

def test_predict():
    # Test for valid coin (e.g., BTC)
    coins = ['BTC', 'SHIB', 'TRX']  # List of coins to test

    for coin in coins:
        # Send GET request with coin as parameter
        params = {'coin': coin}
        response = requests.get(ENDPOINT + "/predict", params=params)

        # Assert the response status code
        assert response.status_code == 200, f"Failed for coin: {coin}"

        # Parse the JSON response
        data = response.json()

        # Validate response structure and data types
        assert "future_predictions" in data, f"Missing 'future_predictions' for coin: {coin}"
        assert isinstance(data["future_predictions"], list), f"'future_predictions' should be a list for coin: {coin}"
        
        assert "actual" in data, f"Missing 'actual' for coin: {coin}"
        assert isinstance(data["actual"], list), f"'actual' should be a list for coin: {coin}"
        
        assert "history" in data, f"Missing 'history' for coin: {coin}"
        assert isinstance(data["history"], list), f"'history' should be a list for coin: {coin}"

        # print(f"Test Passed for coin: {coin}")
        # print(f"Response data for {coin}:", data)