import React from "react";
import Search from "./Search";
import Forecast from "./Forecast";
import { PageHeader, Button } from "react-bootstrap";
require('../css/fullstack.css');
import HeaderBackgroundImage from '../images/header.jpg';

var $ = require('jquery');

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
          forecast: null,
        };
        this.selectedDate = '';

        this.selectedCity = this.selectedCity.bind(this);
    }

    selectedCity(event, {suggestion}) {
        $.get('/forecast/' + suggestion['id'], (data) => {
            this.setState({
                forecast: JSON.parse(data)
            });
        });
    }

    addHeaderImg() {
      let headerBg = new Image();
      headerBg.src = HeaderBackgroundImage;
    }

    render () {
        var forecast = []
        if (this.state.forecast) {
            for (var i = 0; i < this.state.forecast.length; i++) {
                var date = this.state.forecast[i]
                forecast.push(
                    <Forecast key={date.date} forecast={date}></Forecast>
                )
            }
        }

        return (
            <PageHeader>
                <div className='header-contents'>
                    <div className='content-title'>weathermap</div>
                    <Search propCallback={this.selectedCity} />
                    {forecast}
                </div>
            </PageHeader>
        );
    }
}