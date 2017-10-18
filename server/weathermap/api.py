import os
import requests
import time


class API:

    def __init__(self, transform_method=None):
        self.transform_method = transform_method
        self.requests = requests
        self.API_KEY = os.getenv('API_KEY', 'f462d60ead99b3ddf82a413f9d5efe89')
        self.API_URL = os.getenv('API_URL', 'http://api.openweathermap.org/data/2.5/forecast')
        self.FORECAST_CACHE = {}
        self.CACHE_EXPIRATION = 600  # 600 seconds

    def forecast(self, city_id):
        # import json
        # with open(os.getcwd() + '/florianopolis.json', 'r') as file:
        #     self.forecast = file.read()
        # return self.transform_method(json.loads(self.forecast))

        if not city_id:
            return ''

        forecast = self.FORECAST_CACHE.get(city_id)
        if not forecast:
            forecast = self.update_forecast(city_id)
        else:
            cache_age = time.time() - forecast['last_check']
            if cache_age >= self.CACHE_EXPIRATION:
                forecast = self.update_forecast(city_id)

        return forecast['forecast'] if not self.transform_method else self.transform_method(forecast['forecast'])

    def update_forecast(self, city_id):
        self.FORECAST_CACHE[city_id] = {
            'forecast': self.requests.get(self.API_URL, {'id': city_id, 'APPID': self.API_KEY}).text,
            'last_check': time.time()
        }
        return self.FORECAST_CACHE[city_id]
