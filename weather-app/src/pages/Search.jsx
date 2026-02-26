import React from 'react';
import LocationSearch from '../components/weather/LocationSearch';

const Search = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Location Search</h1>
        <p className="text-gray-300">Find weather information for any location worldwide</p>
      </div>
      
      <LocationSearch />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card">
          <h3 className="text-xl font-semibold mb-4 text-purple-200">Search Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Real-time location autocomplete
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Search by city, region, or zip code
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Save favorite locations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Quick access to recent searches
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Global location coverage
            </li>
          </ul>
        </div>
        
        <div className="glass-card">
          <h3 className="text-xl font-semibold mb-4 text-purple-200">Search Tips</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <span className="font-medium text-white">Be specific:</span> 
              <br />"New York, NY" instead of just "New York"
            </li>
            <li>
              <span className="font-medium text-white">Use country codes:</span> 
              <br />"London, UK" or "London, CA"
            </li>
            <li>
              <span className="font-medium text-white">Try zip codes:</span> 
              <br />"10001" for New York
            </li>
            <li>
              <span className="font-medium text-white">International:</span> 
              <br />"Tokyo, Japan" or "Paris, France"
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;