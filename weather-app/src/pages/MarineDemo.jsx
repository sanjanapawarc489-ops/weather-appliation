import React from 'react';
import GlassCard from '../components/ui/GlassCard';

const Marine = () => {
  // Mock marine data for demonstration
  const mockMarine = {
    location: { name: "Sample Ocean Area" },
    water_temp: 22,
    wave_height: 1.5,
    swell_height: 2.0,
    visibility: 15,
    temperature: 24,
    wind_speed: 18,
    wind_direction: 145,
    humidity: 75,
    forecast: [
      {
        date: "2026-02-27",
        wave_height: 1.2,
        wind_speed: 15,
        water_temp: 21,
        weather_descriptions: ["Light winds"]
      },
      {
        date: "2026-02-28",
        wave_height: 1.8,
        wind_speed: 22,
        water_temp: 22,
        weather_descriptions: ["Moderate seas"]
      },
      {
        date: "2026-02-29",
        wave_height: 2.5,
        wind_speed: 28,
        water_temp: 23,
        weather_descriptions: ["Rough conditions"]
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Marine Weather</h1>
        <p className="text-gray-300">Ocean conditions demonstration</p>
      </div>
      
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-purple-200">Current Marine Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Water Conditions</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Water Temperature:</span>
                <span className="text-blue-300">{mockMarine.water_temp}°C</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Wave Height:</span>
                <span className="text-cyan-300">{mockMarine.wave_height}m</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Swell Height:</span>
                <span className="text-indigo-300">{mockMarine.swell_height}m</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Visibility:</span>
                <span className="text-purple-300">{mockMarine.visibility}km</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Weather Conditions</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Air Temperature:</span>
                <span className="text-orange-300">{mockMarine.temperature}°C</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Wind Speed:</span>
                <span className="text-green-300">{mockMarine.wind_speed}km/h</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Wind Direction:</span>
                <span className="text-yellow-300">{mockMarine.wind_direction}°</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Humidity:</span>
                <span className="text-teal-300">{mockMarine.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h4 className="text-lg font-medium text-white mb-3">Marine Forecast</h4>
        <div className="space-y-3">
          {mockMarine.forecast.map((day, index) => (
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
                  <span className="text-gray-300 ml-2 capitalize">{day.weather_descriptions[0]}</span>
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
          This shows how marine weather data would be displayed with a paid WeatherStack subscription.
        </p>
      </GlassCard>
    </div>
  );
};

export default Marine;