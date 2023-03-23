import React, { useState } from "react";
import axios from "axios";

type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
};

const API_KEY = 'a4fc7ce0bd77c0295c03dab4aa72e062';

const WeatherAppp = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
      setWeatherData(null);
    }
  };

  return (
    <div>
        <form onSubmit={handleSearch}>
            <label htmlFor="city">City:</label>
            <input
                    type="text"
                    id="city"
                    value={city}
                    placeholder="Enter City Name"
                    onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    value={country}
                    placeholder="Enter City Name"
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button type="submit">Get Weather</button>
        </form>   
      {weatherData && (
        <div>
          <h3>
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <p>{new Date(weatherData.dt * 1000).toDateString()}</p>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
};

export default WeatherAppp;

