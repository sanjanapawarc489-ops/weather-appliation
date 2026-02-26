import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import TemperatureChart from '../components/charts/TemperatureChart';
import HumidityChart from '../components/charts/HumidityChart';

const Forecast = () => {
  // Mock data for demonstration
  const mockForecast = {
    location: { name: "Sample City", country: "Sample Country" },
    forecast: {
      "2026-02-27": { temperature: 22, mintemp: 15, maxtemp: 28, humidity: 65, chanceofrain: 20, weather_descriptions: ["Partly cloudy"] },
      "2026-02-28": { temperature: 24, mintemp: 17, maxtemp: 30, humidity: 55, chanceofrain: 10, weather_descriptions: ["Sunny"] },
      "2026-02-29": { temperature: 20, mintemp: 12, maxtemp: 25, humidity: 70, chanceofrain: 40, weather_descriptions: ["Overcast"] },
      "2026-03-01": { temperature: 18, mintemp: 10, maxtemp: 23, humidity: 60, chanceofrain: 30, weather_descriptions: ["Light rain"] },
      "2026-03-02": { temperature: 26, mintemp: 19, maxtemp: 32, humidity: 45, chanceofrain: 5, weather_descriptions: ["Clear"] },
      "2026-03-03": { temperature: 23, mintemp: 16, maxtemp: 29, humidity: 50, chanceofrain: 15, weather_descriptions: ["Partly cloudy"] },
      "2026-03-04": { temperature: 21, mintemp: 14, maxtemp: 26, humidity: 58, chanceofrain: 25, weather_descriptions: ["Cloudy"] }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Weather Forecast</h1>
        <p className="text-gray-300">7-day weather forecast demonstration</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperatureChart forecastData={mockForecast} />
        <HumidityChart forecastData={mockForecast} />
      </div>
      
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-purple-200">Forecast Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(mockForecast.forecast).map(([date, data]) => (
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
                  <span className="text-gray-300">Rain Chance:</span>
                  <span className="text-cyan-300">{data.chanceofrain}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      
      <GlassCard className="text-center py-6">
        <div className="text-2xl mb-2">ℹ️</div>
        <h3 className="text-lg font-semibold text-purple-200 mb-2">Demo Version</h3>
        <p className="text-gray-400">
          This shows how the forecast feature would work with real data from a paid WeatherStack subscription.
        </p>
      </GlassCard>
    </div>
  );
};

export default Forecast;