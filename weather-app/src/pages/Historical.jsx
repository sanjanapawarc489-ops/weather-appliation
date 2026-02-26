import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import LocationSearch from '../components/weather/LocationSearch';

const Historical = () => {
  const { 
    historical, 
    loading, 
    errors, 
    fetchHistorical,
    selectedLocation 
  } = useWeather();
  
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleDateRangeSubmit = () => {
    if (selectedLocation && dateRange.startDate && dateRange.endDate) {
      fetchHistorical(selectedLocation, dateRange.startDate, dateRange.endDate);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Historical Weather</h1>
        <p className="text-gray-300">Past weather conditions for specific dates</p>
      </div>
      
      <LocationSearch />
      
      {selectedLocation && (
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4 text-purple-200">Select Date Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                className="glass-input"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                className="glass-input"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <GlassButton
                onClick={handleDateRangeSubmit}
                disabled={loading.historical || !dateRange.startDate || !dateRange.endDate}
                className="w-full"
              >
                {loading.historical ? 'Loading...' : 'Get Historical Data'}
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      )}

      {loading.historical && (
        <GlassCard className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading historical data...</p>
        </GlassCard>
      )}

      {errors.historical && (
        <GlassCard className="text-center py-12">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <p className="text-red-300 mb-4">{errors.historical}</p>
        </GlassCard>
      )}

      {historical && (
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4 text-purple-200">Historical Weather Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-300">Date</th>
                  <th className="text-left py-3 text-gray-300">Temperature</th>
                  <th className="text-left py-3 text-gray-300">Humidity</th>
                  <th className="text-left py-3 text-gray-300">Condition</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(historical.historical || {}).map(([date, data]) => (
                  <tr key={date} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 text-white">{new Date(date).toLocaleDateString()}</td>
                    <td className="py-3 text-purple-300">{data.temperature}°C</td>
                    <td className="py-3 text-blue-300">{data.humidity}%</td>
                    <td className="py-3 text-gray-300 capitalize">{data.weather_descriptions?.[0] || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {!selectedLocation && !historical && !loading.historical && (
        <GlassCard className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-purple-200 mb-2">Historical Weather</h3>
          <p className="text-gray-400">Search for a location and select a date range to view historical weather data</p>
        </GlassCard>
      )}
    </div>
  );
};

export default Historical;