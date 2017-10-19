import random
from flask import Flask, render_template

from server.weathermap.api import API
from server.weathermap.city_loader import CityLoader
from server.weathermap.transformers import openweathertransform

app = Flask(__name__, static_folder="static/dist", template_folder="static")
api = API(openweathertransform)
city_loader = CityLoader()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/forecast/<cityid>')
def forecast(cityid):
    return api.forecast(cityid)


@app.route('/cities/<text>')
def cities(text):
    return city_loader.load(text)


@app.route("/hello")
def hello():
    return get_hello()


def get_hello():
    greeting_list = ['Ciao', 'Hei', 'Salut', 'Hola', 'Hallo', 'Hej']
    return random.choice(greeting_list)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, threaded=True)
