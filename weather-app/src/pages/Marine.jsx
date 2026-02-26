import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

const Marine = () => {
  const { 
    marine, 
    loading, 
    errors, 
    fetchMarine 
  } = useWeather();
  
  const [coordinates, setCoordinates] = useState({
    lat: '',
    lon: ''
  });

  const handleMarineSubmit = () => {
    if (coordinates.lat && coordinates.lon) {
      fetchMarine(coordinates.lat, coordinates.lon);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Marine Weather</h1>
        <p className="text-gray-300">Ocean and sea weather conditions</p>
      </div>
      
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4 text-purple-200">Enter Coordinates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Latitude</label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g., 40.7128"
              className="glass-input"
              value={coordinates.lat}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Longitude</label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g., -74.0060"
              className="glass-input"
              value={coordinates.lon}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lon: e.target.value }))}
            />
          </div>
          <div className="flex items-end">
            <GlassButton
              onClick={handleMarineSubmit}
              disabled={loading.marine || !coordinates.lat || !coordinates.lon}
              className="w-full"
            >
              {loading.marine ? 'Loading...' : 'Get Marine Data'}
            </GlassButton>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Enter latitude and longitude coordinates to get marine weather data
        </p>
      </GlassCard>

      {loading.marine && (
        <GlassCard className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading marine weather data...</p>
        </GlassCard>
      )}

      {errors.marine && (
        <GlassCard className="text-center py-12">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <p className="text-red-300 mb-4">{errors.marine}</p>
        </GlassCard>
      )}

      {marine && (
        <div className="space-y-6">
          <GlassCard>
            <h3 className="text-xl font-semibold mb-4 text-purple-200">Marine Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Water Conditions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300">Water Temperature:</span>
                    <span className="text-blue-300">{marine.water_temp}°C</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300">Wave Height:</span>
                    <span className="text-cyan-300">{marine.wave_height}m</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300">Swell Height:</span>
                    <span className="text-indigo-300">{marine.swell_height}m</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-300">Visibility:</span>
                    <span className="text-purple-300">{marine.visibility}km</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Weather Conditions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300">Air Temperature:</span>
                    <span className="text-orange-300">{marine.temperature}°C</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300">Wind Speed:</span>
                    <span className="text-green-300">{marine.wind_speed}km/h</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300">Wind Direction:</span>
                    <span className="text-yellow-300">{marine.wind_direction}°</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-300">Humidity:</span>
                    <span className="text-teal-300">{marine.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h4 className="text-lg font-medium text-white mb-3">Marine Forecast</h4>
            <div className="space-y-3">
              {marine.forecast?.map((day, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="font-semibold text-white mb-2">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-300">Wave Height:</span>
                      <span className="text-cyan-300 ml-2">{day.wave_height}m</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Wind Speed:</span>
                      <span className="text-green-300 ml-2">{day.wind_speed}km/h</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Water Temp:</span>
                      <span className="text-blue-300 ml-2">{day.water_temp}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Condition:</span>
                      <span className="text-gray-300 ml-2 capitalize">{day.weather_descriptions?.[0] || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {!marine && !loading.marine && !errors.marine && (
        <GlassCard className="text-center py-12">
          <div className="text-6xl mb-4">⛵</div>
          <h3 className="text-xl font-semibold text-purple-200 mb-2">Marine Weather</h3>
          <p className="text-gray-400">Enter coordinates to view marine weather conditions</p>
        </GlassCard>
      )}
    </div>
  );
};

export default Marine;