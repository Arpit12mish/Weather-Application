const API_KEY = '05f6ad72bcd677ceb216c7526c51ed64';

const getFormattedWeatherData = async (city, units = 'metric') => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      icon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    console.error(error.message);

    // Return an object indicating the city was not found
    return {
      cityNotFound: true,
    };
  }
};

export { getFormattedWeatherData };
