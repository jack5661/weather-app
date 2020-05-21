import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Vancouver",
    };
    this.searchWeather = this.searchWeather.bind(this);
    this.inputCity = this.inputCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderWeather = this.renderWeather.bind(this);

    this.searchWeather();
    this.renderWeather();
  }

  inputCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  async searchWeather() {
    try {
      const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${process.env.REACT_APP_API_KEY}`, {mode: "cors",});
      const weather = await info.json();
      console.log(this.state.city);
      this.setState({
        city: this.state.city,
        weather: weather.weather[0].main,
        desc: weather.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
        temp: Math.round(weather.main.temp - 273.15),
        windSpeed: weather.wind.speed, 
        background: `url("https://source.unsplash.com/1600x900/?${this.state.city}")`,
      });
      console.log(this.state);
    } catch(err) {
      console.log(err.name);
      this.setState({
        city: "Cannot Find City",
        weather: "Hopefully Sun",
        desc: "Something Nice",
        icon: "https://openweathermap.org/img/wn/01n.png",
        temp: 0,
        windSpeed: 0,
        background: `linear-gradient(#CFF, #FCC)`,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchWeather();
    this.renderWeather();
  }

  renderWeather() {
    document.body.style.background = this.state.background;
    return(
      <div id = "Weather">
          <h1>Weather in: {this.state.city}</h1>
          <img src = {this.state.icon}/>
          <h2>{this.state.weather}</h2>
          <h3>{this.state.desc}</h3>
          <h2>{this.state.temp} Celsius</h2>
      </div>
    );
  }
  
  render() {
    return (
      <div id = "box">
        <form id = "FORM" onSubmit = {this.handleSubmit}>
          <input placeholder = "Enter City to Search" type = "text" onChange = {this.inputCity}/>
          <button type = "submit">Search</button>
        </form>
        {this.renderWeather()}
      </div>
    );
  }

}

export default App;
