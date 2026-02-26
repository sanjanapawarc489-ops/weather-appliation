import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import TemperatureChart from '../components/charts/TemperatureChart';
import HumidityChart from '../components/charts/HumidityChart';
import LocationSearch from '../components/weather/LocationSearch';

const Forecast = () => {
  const { 
    forecast, 
    loading, 
    errors, 
    fetchForecast,
    selectedLocation 
  } = useWeather();
  
  const [forecastDays, setForecastDays] = useState(7);

  useEffect(() => {
    if (selectedLocation) {
      fetchForecast(selectedLocation, forecastDays);
    }
  }, [selectedLocation, forecastDays]);

  const handleDaysChange = (days) => {
    setForecastDays(days);
    if (selectedLocation) {
      fetchForecast(selectedLocation, days);
    }
  };

  if (loading.forecast) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Weather Forecast</h1>
          <p className="text-gray-300">Predicted weather conditions for the coming days</p>
        </div>
        
        <LocationSearch />
        
        <GlassCard className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading forecast data...</p>
        </GlassCard>
      </div>
    );
  }

  if (errors.forecast) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Weather Forecast</h1>
          <p className="text-gray-300">Predicted weather conditions for the coming days</p>
        </div>
        
        <LocationSearch />
        
        <GlassCard className="text-center py-12">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <p className="text-red-300 mb-4">{errors.forecast}</p>
          <p className="text-gray-400 text-sm">Please try again with a different location</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Weather Forecast</h1>
        <p className="text-gray-300">Predicted weather conditions for the coming days</p>
      </div>
      
      <LocationSearch />
      
      {selectedLocation && (
        <div className="flex flex-wrap gap-3">
          {[3, 5, 7, 14].map(days => (
            <GlassButton
              key={days}
              variant={forecastDays === days ? 'primary' : 'secondary'}
              onClick={() => handleDaysChange(days)}
            >
              {days} Days
            </GlassButton>
          ))}
        </div>
      )}

      {forecast && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemperatureChart forecastData={forecast} />
            <HumidityChart forecastData={forecast} />
          </div>
          
          {/* Forecast Summary */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-4 text-purple-200">Forecast Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(forecast.forecast || {}).map(([date, data]) => (
                <div key={date} className="p-4 bg-white/5 rounded-lg">
                  <div className="font-semibold text-white mb-2">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">High:</span>
                      <span className="text-red-300">{data.maxtemp}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Low:</span>
                      <span className="text-blue-300">{data.mintemp}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Humidity:</span>
                      <span className="text-purple-300">{data.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rain:</span>
                      <span className="text-cyan-300">{data.chanceofrain}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {!selectedLocation && !forecast && (
        <GlassCard className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-purple-200 mb-2">No Forecast Data</h3>
          <p className="text-gray-400">Search for a location to see weather forecasts</p>
        </GlassCard>
      )}
    </div>
  );
};

export default Forecast;