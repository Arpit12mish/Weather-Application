import React, { useState, useEffect } from 'react';
import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import WeatherApp from './components/WeatherApp';
import Description from './components/Description';
import LocationPopup from './components/LocationPopup'; // Import the LocationPopup component
import DeniedLocationPage from './components/DeniedLocationPage';
import Allowpage from './components/Allowpage';
import { getFormattedWeatherData } from './weatherService';

const defaultBg = ''; // Define your default background here

function App() {
  const [city, setCity] = useState('Paris'); // Define the city state
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(hotBg);
  const [showLocationPopup, setShowLocationPopup] = useState(false); // Add showLocationPopup state
  const [locationDenied, setLocationDenied] = useState(false);
  const [isAllowpageVisible, setAllowpageVisible] = useState(false);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur(); // cursor to stop blinking after search
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        // dynamic background
        const threshold = units === 'metric' ? 20 : 60;
        if (data.temp <= threshold) setBg(coldBg);
        else setBg(hotBg);
      } catch (error) {
        console.error(error.message);
        // Handle the error, set the weather to null or some default value
        setWeather(null);
        // Set a default background or handle the error background
        setBg(defaultBg); // Replace defaultBg with your desired background
      }
    };

    fetchWeatherData();
  }, [units, city]); // Add city to the dependency array

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setShowLocationPopup(true);
    } else {
      console.log('Geolocation not supported');
    }
  };

  const handleAllowLocation = () => {
    // navigator.geolocation.getCurrentPosition(success, error);
    setShowLocationPopup(false);
    setAllowpageVisible(true);
  };

  const handleDenyLocation = () => {
    setLocationDenied(true);
    setShowLocationPopup(false);
    
  };

  // const success = (position) => {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   setCity(`(${latitude}, ${longitude})`); // Update the city based on coordinates

  //   // Make API call to OpenWeatherMap
  //   const API_KEY = '05f6ad72bcd677ceb216c7526c51ed64';
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setWeather(data);
  //       console.log(data);
  //     })
  //     .catch(error => console.log(error));
  // };

  // const error = () => {
  //   console.log('Unable to retrieve your location');
  // };


    // Conditionally render DeniedLocationPage if locationDenied is true
    if (locationDenied) {
      return <DeniedLocationPage />;
    }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              {isAllowpageVisible && <Allowpage enterKeyPressed={enterKeyPressed} />}
              <button onClick={(e) => handleUnitsClick(e)} className="a">
                °F
              </button>
              <button className='loc' onClick={handleLocationClick}>Give Location</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <h4 className='c' >---------</h4>
                <h3>{weather.description}</h3>
              </div>
              {weather && (
                <div className="temperature">
                  <h1 className="b">{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
                </div>
              )}
            </div>


            {/* bottom description */}
            <Description weather={weather} units={units}></Description>
          </div>
        )}

        {/* Replace the existing content with the WeatherApp component */}
        {!weather && <WeatherApp />}

        {showLocationPopup && (
          <LocationPopup onAllow={handleAllowLocation} onDeny={handleDenyLocation} />
        )}
      </div>
    </div>
  );
}

export default App;
