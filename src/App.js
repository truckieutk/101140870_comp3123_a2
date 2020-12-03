import React, { useState } from 'react'
import './App.css';
import axios from 'axios'

const api = {
  key: "9db841ab91244f4fc06e79a09f7bbfa4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(result => {
          setWeather(result.data);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Type city name to search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div>
              <img src ={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="wthr img" />
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="info">Description: {weather.weather[0].description}</div>
            <div className="info">Feel like: {Math.round(weather.main.feels_like)} °C</div>
            <div className="info">Humidity: {weather.main.humidity} %</div>
            <div className="info">Wind: {weather.wind.speed} km/h</div>
            <div className="info">Visibility: {weather.visibility} km</div>
            <div className="info">Sunrise: {weather.sys.sunrise}</div>
            <div className="info">Sunset: {weather.sys.sunset}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>

  );

}

export default App;