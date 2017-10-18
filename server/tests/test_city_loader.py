import unittest
import json

from server.weathermap.city_loader import CityLoader


class TestCityAPI(unittest.TestCase):

    with open('../weathermap/city.list.json', 'r') as file:
        cities = json.dumps(json.loads(file.read()))

    def setUp(self):
        self.loader = CityLoader()

    def test_should_get_cities_list(self):
        self.assertEqual(self.cities, self.loader.load('', '/../weathermap/city.list.json'))

    def test_should_get_cities_from_instance(self):
        self.loader.cities = self.cities  # Simulate cached cities
        self.assertEqual(len(self.loader.cities), len(self.loader.load('', '/../weathermap/city.list.json')))

    def test_should_bring_only_cities_starting_with_h(self):
        self.loader.cities = self.cities  # Just to avoid rereading the file.

        cities = json.loads(self.loader.load('h', '/../weathermap/city.list.json'))
        self.assertTrue(len(cities) > 0)

        for city in cities:
            self.assertEqual('h'.upper(), city['name'][0].upper())

    def test_should_bring_only_cities_that_has_hu(self):
        self.loader.cities = self.cities  # Just to avoid rereading the file.

        cities = json.loads(self.loader.load('hu', '/../weathermap/city.list.json'))
        self.assertTrue(len(cities) > 0)

        for city in cities:
            self.assertTrue('hu'.upper() in city['name'].upper())
