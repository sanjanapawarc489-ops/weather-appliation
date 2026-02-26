import React, { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import GlassCard from '../components/ui/GlassCard';
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard';
import LocationSearch from '../components/weather/LocationSearch';

const Dashboard = () => {
  const { 
    currentWeather, 
    fetchCurrentWeather,
    searchHistory,
    favorites
  } = useWeather();

  // Load weather for first favorite or recent search on mount
  useEffect(() => {
    const loadInitialWeather = async () => {
      if (!currentWeather) {
        const location = favorites[0] || searchHistory[0];
        if (location) {
          try {
            await fetchCurrentWeather(location);
          } catch (error) {
            console.error('Error loading initial weather:', error);
          }
        }
      }
    };

    loadInitialWeather();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Weather Dashboard
        </h1>
        <p className="text-gray-300">Your professional weather monitoring center</p>
      </div>

      {/* Search Section */}
      <LocationSearch />

      {/* Current Weather */}
      {currentWeather && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Current Conditions</h2>
          </div>
          <CurrentWeatherCard />
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl font-bold text-purple-300">24°</div>
          <div className="text-sm text-gray-400">Avg Temp</div>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="text-3xl mb-2">💧</div>
          <div className="text-2xl font-bold text-blue-300">65%</div>
          <div className="text-sm text-gray-400">Humidity</div>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="text-3xl mb-2">💨</div>
          <div className="text-2xl font-bold text-green-300">12km/h</div>
          <div className="text-sm text-gray-400">Wind</div>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl font-bold text-yellow-300">1013</div>
          <div className="text-sm text-gray-400">Pressure</div>
        </GlassCard>
      </div>

      {/* Welcome Message */}
      {!currentWeather && (
        <GlassCard className="text-center py-12">
          <div className="text-6xl mb-4">🌤️</div>
          <h3 className="text-2xl font-semibold text-purple-200 mb-4">Welcome to WeatherStack Pro</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Search for any location to get real-time weather data, forecasts, historical information, 
            and marine conditions. All powered by professional weather APIs with a sleek glassmorphic interface.
          </p>
        </GlassCard>
      )}
    </div>
  );
};

export default Dashboard;