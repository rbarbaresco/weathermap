import React from "react";
import {Line} from 'react-chartjs';
import Moment from 'react-moment';


const chartOptions = {
    responsive: true,
    title: {
        display: true,
        text: 'daytime temperature (ºC)'
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'daytime'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'temperature (ºC)'
            }
        }]
    }
};
        
const chartData = {
    labels: [],
    datasets: [{
        data: [],
        label: "temperature (ºC)",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
    }]
};

var calculateCelsius = function(temp) {
    return Math.round(temp - 273);
}

var findMin = function(moments) {
    var min = moments[0].temp;
    for (var i = 1; i < moments.length; i++) {
        if (moments[i].temp < min)
            min = moments[i].temp;
    }
    return calculateCelsius(min);
}

var findMax = function(moments) {
    var max = moments[0].temp;
    for (var i = 1; i < moments.length; i++) {
        if (moments[i].temp > max)
            max = moments[i].temp;
    }
    return calculateCelsius(max);
}

export default class Forecast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {forecast: props.forecast, 'day': null};
        this.changeDay = this.changeDay.bind(this);
    }

    changeDay(date) {
        this.state.forecast.map((date) => date.active = '');
        date.active = 'active';
        this.setState({'day': date});
    }

    render () {
        var days = [];
        var forecast = this.state.forecast
        for (var i = 0; i < forecast.length; i++) {
            let date = forecast[i];
            days.push(
                <button className={`select-date ${date.active}`} key={date.date} onClick={ () => this.changeDay(date) }>
                    <Moment format="ddd">{date.date}</Moment>
                    <img src={date.moments[4].icon}></img>
                </button>
            );
        }

        var day = this.state.day
        if (!day) {
            day = forecast[0];
        }

        var labels = [];
        var temp_data = [];
        for (var j = 0; j < day.moments.length; j++) {
            labels.push(day.moments[j].time)
            temp_data.push(calculateCelsius(day.moments[j].temp))
        }
        chartData.labels = labels
        chartData.datasets[0].data = temp_data

        return (
            <div className='forecast-item'>
                <div className='btn-wrapper'>
                    {days}
                </div>
                <div className='forecast-temp'>
                    <div className='temperature-display'>{calculateCelsius(day.moments[0].temp)}ºC</div>
                    <img src={day.moments[0].icon}></img>
                </div>
                <div className='min-max-temp'>
                    <label>min {findMin(day.moments)}ºC</label>
                    <label>max {findMax(day.moments)}ºC</label>
                </div>
                <div className='forecast-item-temp'>Temperature [ºC]</div>
                <Line data={chartData} options={chartOptions} width="600" height="200"></Line>
            </div>
        )
    }
}