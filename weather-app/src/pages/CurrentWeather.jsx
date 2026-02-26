import React from 'react';
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard';
import LocationSearch from '../components/weather/LocationSearch';

const CurrentWeather = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Current Weather</h1>
        <p className="text-gray-300">Real-time weather conditions for your selected location</p>
      </div>
      
      <LocationSearch />
      <CurrentWeatherCard />
    </div>
  );
};

export default CurrentWeather;