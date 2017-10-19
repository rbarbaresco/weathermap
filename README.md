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
* Docker

## Building the application:

Option 1: python server  
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


Option 2: Docker  
1) build the application:  
$ docker-compose build

2) run the server:  
$ docker-compose up

3) access via browser http://localhost:5000 and you are good to go :)


## Future improvements:
* As the server access a free api with requests limits, it's a good idea to use an in-memory data structure store such as Redis to cache the data, as the forecast don't change very often.
* I used the same icons of the API, which don't match pretty well the application layout. It's a good idea to use some more matching icons.
* Still about the icons, change from img html tag to style images, as will make the application a lot more performatic.
* Add more details about the current and incoming weather, adding information like sea level, precipitation, wind and others provided by the api.
* More precise forecast with the icons, because the icons shows the weather of the 12:00:00 of the day only. When a day is selected, it shows the 00:00:00 forecast icon.
