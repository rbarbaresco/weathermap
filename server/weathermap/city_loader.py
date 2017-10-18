import os
import json


class CityLoader:

    def __init__(self):
        self.cities = ''

    def load(self, text='', file_path='/city.list.json'):
        if not self.cities:
            with open(os.getcwd() + file_path, 'r') as file:
                self.cities = file.read()

        cities_resp = [city for city in json.loads(self.cities) if self.satisfies(city, text)]
        return json.dumps(cities_resp)

    def satisfies(self, city, text):
        if len(text) == 0:
            return True
        if len(city['name']) > 0:
            if len(text) == 1:
                return city['name'][0].upper() == text.upper()
            else:
                return text.upper() in city['name'].upper()
        else:
            return city['country'][0].upper() == text.upper()
