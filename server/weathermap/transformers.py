import json


def openweathertransform(forecast):
    if type(forecast) is str:
        forecast = json.loads(forecast)

    days = {}
    response = []
    for current in forecast['list']:
        splitted_date = current['dt_txt'].split(' ')
        day = days.get(splitted_date[0])
        if not day:
            day = {'date': splitted_date[0], 'moments': []}
            days[splitted_date[0]] = day
            response.append(day)

        day['moments'].append({
            'time': splitted_date[1],
            'temp': current['main']['temp'],
            'temp_min': current['main']['temp_min'],
            'temp_max': current['main']['temp_max'],
            'humidity': current['main']['humidity'],
            'description': current['weather'][0]['description'],
            'icon': 'http://openweathermap.org/img/w/{}.png'.format(current['weather'][0]['icon']),
            'wind_speed': current['wind']['speed']
        })
    return json.dumps(response)
