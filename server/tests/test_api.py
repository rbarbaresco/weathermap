import unittest
from unittest.mock import MagicMock
import httpretty
import time


from server.weathermap.api import API


class TestAPI(unittest.TestCase):

    with open('florianopolis.json', 'r') as file:
        floripa_forecast = file.read()

    def setUp(self):
        self.api = API()
        self.floripa_id = 6323121

    @httpretty.activate
    def test_should_get_floripas_forecast(self):
        httpretty.register_uri(httpretty.GET, self.api.API_URL, body=self.floripa_forecast)
        response = self.api.forecast(self.floripa_id)
        self.assertEqual(self.floripa_forecast, response)

    @httpretty.activate
    def test_should_cache(self):
        httpretty.register_uri(httpretty.GET, self.api.API_URL, body=self.floripa_forecast)

        self.assertTrue(len(self.api.FORECAST_CACHE.keys()) == 0)
        self.api.forecast(self.floripa_id)
        self.assertTrue(len(self.api.FORECAST_CACHE.keys()) == 1)

    def test_should_get_floripas_forecast_from_cache(self):
        self.api.requests.get = MagicMock()

        self.api.forecast(self.floripa_id)  # First call, to cache it.
        self.api.forecast(self.floripa_id)  # Second call, should get from cache.

        url = self.api.API_URL
        params = {'id': self.floripa_id, 'APPID': self.api.API_KEY}
        self.api.requests.get.assert_called_once_with(url, params)

    def test_should_not_get_floripas_forecast_from_cache(self):
        self.api.requests.get = MagicMock()

        self.api.forecast(self.floripa_id)  # First call, to cache it.
        self.api.FORECAST_CACHE[self.floripa_id]['last_check'] = time.time() - 600  # Make cache old
        self.api.forecast(self.floripa_id)  # Second call, should not get from cache.

        self.assertEqual(self.api.requests.get.call_count, 2)

    def test_should_return_empty_str_for_null_city_id(self):
        self.assertEqual('', self.api.forecast(None))
