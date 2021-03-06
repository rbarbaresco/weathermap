import React from "react";
import Search from "./Search";
import Forecast from "./Forecast";
require('../css/fullstack.css');

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
        this.setState({
            forecast: null
        });
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
        /*var forecast = []
        if (this.state.forecast) {
            for (var i = 0; i < this.state.forecast.length; i++) {
                var date = this.state.forecast[i]
                forecast.push(
                    <Forecast key={date.date} forecast={date}></Forecast>
                )
            }
        }*/

        var forecast = null;
        if (this.state.forecast) {
            forecast = <Forecast forecast={this.state.forecast}></Forecast>
        }

        return (
            <div className='header-contents'>
                <div className='content-title'>weathermap</div>
                <Search propCallback={this.selectedCity} />
                {forecast}
            </div>
        );
    }
}