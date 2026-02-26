import axios from 'axios';
import { WEATHERSTACK_API_KEY, WEATHERSTACK_BASE_URL, API_ENDPOINTS, DEFAULT_UNITS, DEFAULT_LANGUAGE } from '../utils/constants';

class WeatherService {
  constructor() {
    this.apiKey = WEATHERSTACK_API_KEY;
    this.baseUrl = WEATHERSTACK_BASE_URL;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  }

  // Get cached data if available and not expired
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  // Set data in cache
  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Create cache key for requests
  createCacheKey(endpoint, params) {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  // Make API request with error handling
  async makeRequest(endpoint, params = {}) {
    try {
      const cacheKey = this.createCacheKey(endpoint, params);
      const cachedData = this.getCachedData(cacheKey);
      
      if (cachedData) {
        return { data: cachedData, fromCache: true };
      }

      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params: {
          access_key: this.apiKey,
          units: DEFAULT_UNITS,
          lang: DEFAULT_LANGUAGE,
          ...params
        },
        timeout: 10000 // 10 second timeout
      });

      if (response.data.error) {
        throw new Error(response.data.error.info || 'API Error');
      }

      this.setCachedData(cacheKey, response.data);
      return { data: response.data, fromCache: false };
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.error?.info || error.message}`);
      } else if (error.request) {
        throw new Error('Network Error: Please check your connection');
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Get current weather for a location
  async getCurrentWeather(query) {
    if (!query) throw new Error('Location query is required');
    
    const { data } = await this.makeRequest(API_ENDPOINTS.CURRENT, { query });
    return data;
  }

  // Get weather forecast
  async getForecast(query, days = 7) {
    if (!query) throw new Error('Location query is required');
    
    const { data } = await this.makeRequest(API_ENDPOINTS.FORECAST, { 
      query, 
      forecast_days: days 
    });
    return data;
  }

  // Get historical weather data
  async getHistoricalWeather(query, date) {
    if (!query) throw new Error('Location query is required');
    if (!date) throw new Error('Date is required');
    
    const { data } = await this.makeRequest(API_ENDPOINTS.HISTORICAL, { 
      query, 
      historical_date: date 
    });
    return data;
  }

  // Get historical weather for a date range
  async getHistoricalWeatherRange(query, startDate, endDate) {
    if (!query) throw new Error('Location query is required');
    if (!startDate || !endDate) throw new Error('Start and end dates are required');
    
    const { data } = await this.makeRequest(API_ENDPOINTS.HISTORICAL, { 
      query, 
      historical_date_start: startDate,
      historical_date_end: endDate
    });
    return data;
  }

  // Get marine weather data
  async getMarineWeather(lat, lon) {
    if (!lat || !lon) throw new Error('Latitude and longitude are required');
    
    const { data } = await this.makeRequest(API_ENDPOINTS.MARINE, { 
      lat,
      lon
    });
    return data;
  }

  // Get location autocomplete suggestions
  async getLocationSuggestions(query) {
    if (!query || query.length < 2) return [];
    
    try {
      const { data } = await this.makeRequest(API_ENDPOINTS.LOCATIONS, { 
        query,
        limit: 10
      });
      return data.data || [];
    } catch (error) {
      console.warn('Location suggestions error:', error.message);
      return [];
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache size
  getCacheSize() {
    return this.cache.size;
  }
}

export default new WeatherService();
