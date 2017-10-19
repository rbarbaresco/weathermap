# An application in Python, Flask and Javascript, ReactJS.

Application that shows the forecast of the week, using the free http://openweathermap.org api. This application can be used as template for future projects using the same tecnologies.

## Main Technologies:
* Python
* pip
* Flask
* Javascript
* ReactJS
* NPM
* webpack
* CSS

## Building the application:

Option 1: ## python server
1) use pip to install the requirements of the server:
$ pip install -r requirements.txt
Obs.: I highly recommend to use a virtual env to avoid dependency conflicts.

2) change directory to static folder:
$ cd static

3) install front end dependencies:
$ npm install

4) build the front end:
$ npm run build
Obs.: You can use 'npm run watch' to avoid building the front end everytime a change is made.

5) change to main directory:
$ cd ..

6) run the server:
$ python server.py

7) access via browser http://localhost:5000 and you are good to go :)


Option 2: ## Docker
1) build the application:
$ docker-compose build

2) run the server:
$ docker-compose up

3) access via browser http://localhost:5000 and you are good to go :)


