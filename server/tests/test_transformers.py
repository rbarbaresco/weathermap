import unittest
import json

from server.weathermap.transformers import openweathertransform


class TestTransformers(unittest.TestCase):

    with open('florianopolis.json', 'r') as file:
        floripa_forecast = file.read()

    def test_should_bring_five_days(self):
        response = json.loads(openweathertransform(self.floripa_forecast))
        self.assertEqual(5, len(response))
