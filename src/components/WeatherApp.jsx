import React, { useState } from 'react';
import LocationPopup from './LocationPopup';

function WeatherApp() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  function handleLocationClick() {
    if (navigator.geolocation) {
      setShowLocationPopup(true);
    } else {
      console.log('Geolocation not supported');
    }
  }

  function handleAllowLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
    setShowLocationPopup(false);
  }

  function handleDenyLocation() {
    setShowLocationPopup(false);
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    const API_KEY = '05f6ad72bcd677ceb216c7526c51ed64';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log('Unable to retrieve your location');
  }

  return (
    <div>
      {!location && (
        <div>
          <button onClick={handleLocationClick}>Get Location</button>
          {showLocationPopup && (
            <LocationPopup onAllow={handleAllowLocation} onDeny={handleDenyLocation} />
          )}
        </div>
      )}
      {location && !weather ? <p>Loading weather data...</p> : null}
      {weather && (
        <div>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
