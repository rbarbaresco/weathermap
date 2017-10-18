import React from "react";
import {Line} from 'react-chartjs';
import Moment from 'react-moment';

export default class Forecast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {forecast: props.forecast};
    }

    render () {

        var forecast = this.state.forecast;
        var labels = [];
        var temp_data = [];
        var prec_data = [];
        for (var i = 0; i < forecast.moments.length; i++) {
            labels.push(forecast.moments[i].time)
            temp_data.push(forecast.moments[i].temp - 273)
            prec_data.push(forecast.moments[i].rain)
        }
        var chartData = {
            labels: labels,
            datasets: [{
                data: temp_data,
                label: "temperature (ºC)",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
            },
            {
                data: prec_data,
                label: "precipitation",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
            }]
        };
        var chartOptions = {
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

        return (
            <div className='forecast-item'>
                <Moment className='forecast-item-date' format="dddd">{forecast.date}</Moment>
                <img src={forecast.moments[0].icon}></img>
                <div className='forecast-item-temp'>Temperature [ºC]</div>
                <div>
                    <Line data={chartData} options={chartOptions} width="600" height="250"></Line>
                </div>
            </div>
        )
    }
}