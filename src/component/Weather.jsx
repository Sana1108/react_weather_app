import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Style from './weather.module.css';

const Weather = () => {
    const [city, setCity] = useState('pune'); 
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const apiKey = '4ecf6f33408ba4025be69a92425454e7'; 

    const fetchWeatherData = (city) => {
        setError(null);
        setLoading(true);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then((response) => {
                console.log("Weather data fetched:", response.data);
                setWeather(response.data);
            })
            .catch(err => {
                setError('Error fetching weather data. Please check the city name or your API key.');
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = () => {
        fetchWeatherData(city);
    };

    return (
        <section className={Style.mainbody}>
            <h2>{weather ? weather.name : 'Weather'}</h2>
            <div className={Style.searchContainer}>
                <input 
                    type="text" 
                    value={city} 
                    onChange={handleCityChange} 
                    placeholder="Enter city name" 
                />
                <button onClick={handleSearch}>
                    <i className="fas fa-search"></i> 
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className={Style.error}>{error}</p>}
            {weather ? (
                <div>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                        alt={weather.weather[0].description} 
                        className={Style.weatherIcon}
                    />
                    <p className={Style.temp}>{Math.floor(weather.main.temp)} °C</p>
                    <p>{weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity} %</p> 
                </div>
            ) : (
                <p>No weather data available. Please search for a city.</p>
            )}
        </section>
    );
};

export default Weather;
