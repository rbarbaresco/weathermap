import React from "react";
import Autosuggest from 'react-autosuggest';

var $ = require('jquery');

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.selectedCityCallback = props.propCallback

    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };
    
    this.loadSuggestions = this.loadSuggestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }
  
  loadSuggestions(value) {
    
    this.setState({
      isLoading: true
    });

    setTimeout(() => {
        $.get('/cities/' + value, (data) => {
            this.setState({
                isLoading: false,
                suggestions: JSON.parse(data)
            });
        });
    }, 500);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  };
    
  onSuggestionsFetchRequested({ value }) {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionValue(suggestion) {
      return '';
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}/{suggestion.country}</span>
    );
  }

  render() {
    const { value, suggestions, isLoading } = this.state;
    const inputProps = {
      placeholder: "Search city...",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.selectedCityCallback}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
      </div>
    );
  }
}
