import React, { useState, useEffect } from "react";
import Sunrise from './Sunrise';
import "./Dashboard.css";
import Chart from "./Chart";



function Dashboard({city}) {
  const [weatherData, setWeatherData] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [sunrise,setSunrise]=useState(null);
  const [sunset,setSunset]=useState(null);
  const [x,setX]=useState(null);
  const [y1,setY1]=useState(null);
  const [y2,setY2]=useState(null);

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
    chartValues(data);
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
    const date = new Date(data.city.sunrise* 1000);
    setSunrise(date.toLocaleTimeString());
    const d=new Date(data.city.sunset* 1000);
    setSunset(d.toLocaleTimeString());
    setWeatherData(dailyData.slice(1, 5)); // 4 days
  };
  //chart 
  function chartValues(data){
    const y1=data.list.map((item)=>item.main.temp).splice(0,12);
    const x=data.list.map((item)=>(new Date(item.dt_txt)).toLocaleTimeString()).splice(0,12);
    const y2=data.list.map((item)=>item.main.feels_like).splice(0,12);
    console.log(y2);
    setX(x);
    setY1(y1);
    setY2(y2);
  }



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
      <Sunrise t1={sunrise} t2={sunset}/>
      <Chart x={x} y1={y1} y2={y2}/>
    </div>
  );
}

export default Dashboard;
