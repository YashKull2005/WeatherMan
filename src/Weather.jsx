import React, { useState, useEffect } from 'react';
import './Weather.css';

function Weather({city,setCity}) {
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());


  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === '404') {
        alert('City not found!');
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
    
  };
  
  


  useEffect(() => {
    fetchWeather(city);
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    setDateTime(new Date());
  }, 1000); // update every second

  return () => clearInterval(interval); // cleanup
}, []);

  const getImage = () => {
    const condition = weatherData?.weather?.[0]?.main.toLowerCase();
    if (!condition) return '';

    if (condition.includes('cloud')) return '/overcast.png';
    if (condition.includes('clear')) return '/clear-sky.png';
    if (condition.includes('rain')) return '/rain.png';
    if (condition.includes('snow')) return '/snow.png';
    if (condition.includes('mist')) return '/mist.png';
    return '';
  };

  return (
    
    <div className="container">
        <h1>Weather Forecast</h1>
        <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '-10px', color:"black" }}>
  {dateTime.toLocaleString()}
</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          required
          className="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather(city)}
        />
        <button className="search-button" onClick={() => fetchWeather(city)}>🔍</button>
      </div>

      {weatherData && (
        <>
          <div className="image-container">
            <img src={getImage()} className="image" alt="weather" />
          </div>
          <div>
            <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
            <p className="city">{weatherData.name}</p>
          </div>
          <div className="humidity-wind">
            <div>
              <img src="/humidity.png" className="humidity-image" alt="humidity" />
              <p className="humidity">
                <span className="humidity-value">{weatherData.main.humidity}%</span>
                <br />
                Humidity
              </p>
            </div>
            <div>
              <img src="wind.png" className="humidity-image" alt="wind" />
              <p className="humidity">
                <span className="wind-value">{weatherData.wind.speed} km/h</span>
                <br />
                Wind Speed
              </p>
            </div>
          </div>
        </>
      )}
      
    </div>
  );
}

export default Weather;
