import React, { useState } from "react";
import styled from 'styled-components';
import axios from "axios";

type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
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
    setCity("");
    setCountry("");
  };

  return (
    <WeatherContainer>
      <Header>
        <div>
          Weather App
        </div>
      </Header>
      <SearchContainer>
        <div>
          <form onSubmit={handleSearch}>
            
            <Input
              type="text"
              id="city"
              value={city}
              placeholder="Enter city..."
              onChange={(e) => setCity(e.target.value)}
            />
            
            <Input
              type="text"
              id="country"
              value={country}
              placeholder="Enter country..."
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button type="submit">
              <div>
                Check Weather
              </div>
            </Button>
          </form>
        </div>
      </SearchContainer>
      {weatherData && (
        <WeatherCard>
          <div>
            <DisplayHeader>
              <div>
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div>{new Date(weatherData.dt * 1000).toDateString()}</div>
              <div>{weatherData.weather[0].description}</div>
            </DisplayHeader>
            <WeatherInfo>
              <div>
                <WeatherLabel>TemWeatherLabelerature: </WeatherLabel>
                <WeatherValue>{weatherData.main.temp} °C</WeatherValue>
              </div>
              <div>
                <WeatherLabel>Humidity: </WeatherLabel>
                <WeatherValue>{weatherData.main.humidity} %</WeatherValue>
              </div>
              <div>
                <WeatherLabel>Wind: </WeatherLabel>
                <WeatherValue>{weatherData.wind.speed} m/s</WeatherValue>
              </div>
              <div>
                <WeatherLabel>Pressure: </WeatherLabel>
                <WeatherValue>{weatherData.main.pressure} hPa</WeatherValue>
              </div>
            </WeatherInfo>
          </div>
        </WeatherCard>
      )}
    </WeatherContainer>
  );
};

export default WeatherAppp;

const WeatherContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-size: 40px;
  text-transform: uppercase;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 10px;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: #dae2df;
  color: #0e0d0d;
`;

const Button = styled.button`
  font-size: 10px;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: #0077be;
  color: white;
`;

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 0 50px rgba(134, 26, 223, 0.9);
  border-radius: 0.5rem;
`;

const DisplayHeader = styled.div`
  font-size: 20px;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;
  margin: 5rem;
`;

const WeatherLabel = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const WeatherValue = styled.span`
  font-size: 1.1rem;
`;