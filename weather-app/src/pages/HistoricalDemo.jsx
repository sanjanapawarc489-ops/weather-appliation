import React from 'react';
import GlassCard from '../components/ui/GlassCard';

const Historical = () => {
  // Mock historical data for demonstration
  const mockHistorical = {
    location: { name: "Sample City", country: "Sample Country" },
    historical: {
      "2024-02-26": { temperature: 18, humidity: 60, weather_descriptions: ["Sunny"] },
      "2024-02-25": { temperature: 16, humidity: 65, weather_descriptions: ["Partly cloudy"] },
      "2024-02-24": { temperature: 20, humidity: 55, weather_descriptions: ["Clear"] },
      "2024-02-23": { temperature: 14, humidity: 70, weather_descriptions: ["Rainy"] },
      "2024-02-22": { temperature: 22, humidity: 50, weather_descriptions: ["Sunny"] },
      "2024-02-21": { temperature: 19, humidity: 62, weather_descriptions: ["Cloudy"] },
      "2024-02-20": { temperature: 17, humidity: 68, weather_descriptions: ["Overcast"] }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Historical Weather</h1>
        <p className="text-gray-300">Past weather conditions demonstration</p>
      </div>
      
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
              {Object.entries(mockHistorical.historical).map(([date, data]) => (
                <tr key={date} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 text-white">{new Date(date).toLocaleDateString()}</td>
                  <td className="py-3 text-purple-300">{data.temperature}°C</td>
                  <td className="py-3 text-blue-300">{data.humidity}%</td>
                  <td className="py-3 text-gray-300 capitalize">{data.weather_descriptions[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      
      <GlassCard className="text-center py-6">
        <div className="text-2xl mb-2">ℹ️</div>
        <h3 className="text-lg font-semibold text-purple-200 mb-2">Demo Version</h3>
        <p className="text-gray-400">
          This shows how historical weather data would be displayed with a paid WeatherStack subscription.
        </p>
      </GlassCard>
    </div>
  );
};

export default Historical;