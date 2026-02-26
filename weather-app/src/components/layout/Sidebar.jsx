import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import GlassCard from '../ui/GlassCard';

const Sidebar = () => {
  const { 
    searchHistory, 
    favorites, 
    removeFavorite, 
    setActiveTab,
    fetchCurrentWeather 
  } = useWeather();

  const handleLocationClick = async (location) => {
    try {
      await fetchCurrentWeather(location);
      setActiveTab('current');
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Favorites Section */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4 text-purple-200">Favorites</h3>
        {favorites.length > 0 ? (
          <div className="space-y-2">
            {favorites.map((favorite, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleLocationClick(favorite)}
              >
                <span className="text-white">{favorite}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(favorite);
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No favorites yet</p>
        )}
      </GlassCard>

      {/* Recent Searches */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4 text-purple-200">Recent Searches</h3>
        {searchHistory.length > 0 ? (
          <div className="space-y-2">
            {searchHistory.slice(0, 5).map((search, index) => (
              <div 
                key={index}
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleLocationClick(search)}
              >
                <span className="text-white">{search}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No recent searches</p>
        )}
      </GlassCard>

      {/* Quick Stats */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4 text-purple-200">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-300">24°</div>
            <div className="text-xs text-gray-400">Avg Temp</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-300">65%</div>
            <div className="text-xs text-gray-400">Humidity</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-green-300">12km/h</div>
            <div className="text-xs text-gray-400">Wind</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-300">1013</div>
            <div className="text-xs text-gray-400">Pressure</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Sidebar;