import React, { useState, useEffect } from "react";
import "./Dashboard.css";


function Dashboard({city}) {
  const [weatherData, setWeatherData] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const findLongLat = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();
      if (!data || data.length === 0) return null;
      return { lat: data[0].lat, lon: data[0].lon };
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const fetchWeather = async (cityName) => {
    const coords = await findLongLat(cityName);
    if (!coords) return;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    // Get first forecast for each day
    const dailyData = [];
    const usedDates = new Set();
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!usedDates.has(date)) {
        dailyData.push(item);
        usedDates.add(date);
      }
    });
    console.log(data);

    setWeatherData(dailyData.slice(1, 5)); // 4 days
  };
//   useEffect(() => {
//   console.log("Updated chartData:", chartData);
// }, [chartData]);


  useEffect(() => {
    fetchWeather(city);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (condition) => {
    if (!condition) return "";
    condition = condition.toLowerCase();
    if (condition.includes("cloud")) return "/overcast.png";
    if (condition.includes("clear")) return "/clear-sky.png";
    if (condition.includes("rain")) return "/rain.png";
    if (condition.includes("snow")) return "/snow.png";
    if (condition.includes("mist")) return "/mist.png";
    return "";
  };

  return (
    <div className="dashboard">
      <h1>Weather in {city}</h1>
      <p align="center">{dateTime.toLocaleString()}</p>

      <div className="forecast-grid">
       
        {weatherData.length === 0 ? (
          <div className="loading">
            Loading.....
          </div>
        ) : (
          weatherData.map((day, idx) => {
            const date = new Date(day.dt * 1000).toLocaleDateString();
            const temp = day.main.temp;
            const condition = day.weather[0].main;
            return (
              <div
                key={idx}
                className="weather-card"
              >
                <p className="date">{date}</p>
                <img
                  className="weather-icon"
                  src={getIcon(condition)}
                  alt={condition}
                  width={50}
                  height={50}
                />
                <p className="temperature">{temp.toFixed(1)}°C</p>
                <p>{condition}</p>
              </div>
            );
          })
        )}
      </div>
      
    </div>
  );
}

export default Dashboard;
