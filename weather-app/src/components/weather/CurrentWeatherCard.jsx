import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import GlassCard from '../ui/GlassCard';
import GlassButton from '../ui/GlassButton';

const CurrentWeatherCard = () => {
  const { currentWeather, loading, errors, selectedLocation } = useWeather();
  
  console.log('CurrentWeatherCard render:', { currentWeather, loading, errors, selectedLocation });

  if (loading.current) {
    return (
      <GlassCard className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading weather data...</p>
      </GlassCard>
    );
  }

  if (errors.current) {
    return (
      <GlassCard className="text-center py-12">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <p className="text-red-300 mb-4">{errors.current}</p>
        <p className="text-gray-400 text-sm">Please try again with a different location</p>
      </GlassCard>
    );
  }

  if (!currentWeather || !currentWeather.location) {
    return (
      <GlassCard className="text-center py-12">
        <div className="text-6xl mb-4">🌤️</div>
        <h3 className="text-xl font-semibold text-purple-200 mb-2">No Weather Data</h3>
        <p className="text-gray-400">Search for a location to see current weather conditions</p>
      </GlassCard>
    );
  }

  const { location, current } = currentWeather;

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <GlassCard>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{location.name}</h2>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{location.country}</span>
            </div>
            <p className="text-gray-400">{location.region}</p>
          </div>
          
          <div className="text-center">
            <div className="text-6xl font-light mb-2">
              {current.temperature}°
            </div>
            <div className="text-xl text-gray-300 capitalize">
              {current.weather_descriptions[0]}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl font-bold text-purple-300">{current.temperature}°</div>
          <div className="text-sm text-gray-400">Temperature</div>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="text-3xl mb-2">💧</div>
          <div className="text-2xl font-bold text-blue-300">{current.humidity}%</div>
          <div className="text-sm text-gray-400">Humidity</div>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="text-3xl mb-2">💨</div>
          <div className="text-2xl font-bold text-green-300">{current.wind_speed} km/h</div>
          <div className="text-sm text-gray-400">Wind Speed</div>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl font-bold text-yellow-300">{current.feelslike}°</div>
          <div className="text-sm text-gray-400">Feels Like</div>
        </GlassCard>
      </div>

      {/* Additional Details */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4 text-purple-200">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-gray-300">Pressure:</span>
            <span className="text-white">{current.pressure} mb</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-gray-300">Visibility:</span>
            <span className="text-white">{current.visibility} km</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-gray-300">UV Index:</span>
            <span className="text-white">{current.uv_index}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-gray-300">Wind Direction:</span>
            <span className="text-white">{current.wind_dir}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-gray-300">Cloud Cover:</span>
            <span className="text-white">{current.cloudcover}%</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-300">Precipitation:</span>
            <span className="text-white">{current.precip || 0} mm</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CurrentWeatherCard;