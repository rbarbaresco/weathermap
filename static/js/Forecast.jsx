import React from "react";
import {Line} from 'react-chartjs';

export default class Forecast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {forecast: props.forecast};
    }

    render () {

        var forecast = this.state.forecast;
        var labels = [];
        var data = [];
        for (var i = 0; i < forecast.moments.length; i++) {
            labels.push(forecast.moments[i].time)
            data.push(forecast.moments[i].temp - 273)
        }

        var chartData = {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };
        var chartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };

        return (
            <div>
                <span>{forecast.date}</span>
                <img src={forecast.moments[0].icon}></img>
                <Line data={chartData} options={chartOptions}></Line>
            </div>
        )
    }
}