import React, { useState, useEffect, useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import GlassCard from '../ui/GlassCard';
import GlassInput from '../ui/GlassInput';
import GlassButton from '../ui/GlassButton';
import { MagnifyingGlassIcon, ClockIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';

const LocationSearch = () => {
  const {
    searchQuery,
    searchResults,
    searchHistory,
    favorites,
    loading,
    errors,
    setSearchQuery,
    searchLocations,
    fetchCurrentWeather,
    addFavorite,
    removeFavorite,
    setActiveTab
  } = useWeather();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const searchRef = useRef(null);

  // Check if current location is in favorites
  useEffect(() => {
    setIsFavorite(favorites.includes(searchQuery));
  }, [searchQuery, favorites]);

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      searchLocations(query);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle location selection
  const handleLocationSelect = async (location) => {
    try {
      setSearchQuery(location);
      setShowSuggestions(false);
      await fetchCurrentWeather(location);
      setActiveTab('current');
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(searchQuery);
    } else {
      addFavorite(searchQuery);
    }
  };

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await fetchCurrentWeather(searchQuery.trim());
        setActiveTab('current');
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6" ref={searchRef}>
      {/* Search Form */}
      <GlassCard>
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative">
            <GlassInput
              type="text"
              placeholder="Search for a city, region, or zip code..."
              value={searchQuery}
              onChange={handleSearchChange}
              icon={MagnifyingGlassIcon}
              onIconClick={handleSearchSubmit}
              className="pr-12"
            />
            
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <GlassButton
              type="submit"
              variant="primary"
              disabled={loading.current || !searchQuery.trim()}
              className="flex-1 sm:flex-none"
            >
              {loading.current ? 'Searching...' : 'Get Weather'}
            </GlassButton>
            
            {searchQuery && (
              <GlassButton
                type="button"
                variant={isFavorite ? 'danger' : 'secondary'}
                onClick={handleFavoriteToggle}
                className="flex items-center gap-2"
              >
                <HeartIcon className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
              </GlassButton>
            )}
          </div>
        </form>
      </GlassCard>

      {/* Search Suggestions */}
      {showSuggestions && searchResults.length > 0 && (
        <GlassCard className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Suggestions</h3>
          <div className="space-y-1">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => handleLocationSelect(result.name)}
              >
                <div className="font-medium text-white">{result.name}</div>
                <div className="text-sm text-gray-400">
                  {result.region && `${result.region}, `}
                  {result.country}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <ClockIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-200">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.slice(0, 8).map((search, index) => (
              <GlassButton
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => handleLocationSelect(search)}
                className="flex items-center gap-2"
              >
                {search}
                <XMarkIcon 
                  className="w-4 h-4 hover:text-red-400" 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Remove from history logic would go here
                  }}
                />
              </GlassButton>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Error Display */}
      {errors.locations && (
        <GlassCard className="border border-red-400/50">
          <div className="text-red-400 text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <p>{errors.locations}</p>
          </div>
        </GlassCard>
      )}

      {/* Loading State */}
      {loading.locations && (
        <GlassCard>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
            <p className="text-gray-300">Finding locations...</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default LocationSearch;