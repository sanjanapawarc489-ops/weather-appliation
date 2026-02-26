import React, { createContext, useContext, useReducer, useEffect } from 'react';
import WeatherService from '../services/WeatherService';
import { TABS } from '../utils/constants';

// Initial state
const initialState = {
  // Current active tab
  activeTab: TABS.DASHBOARD,
  
  // Weather data
  currentWeather: null,
  forecast: null,
  historical: null,
  marine: null,
  
  // Loading states
  loading: {
    current: false,
    forecast: false,
    historical: false,
    marine: false,
    locations: false
  },
  
  // Error states
  errors: {
    current: null,
    forecast: null,
    historical: null,
    marine: null,
    locations: null
  },
  
  // Search and location data
  searchQuery: '',
  searchResults: [],
  searchHistory: [],
  selectedLocation: null,
  
  // Settings
  units: 'metric', // metric, imperial, scientific
  temperatureUnit: 'C', // C, F, K
  favorites: [],
  
  // UI states
  sidebarOpen: false,
  showSearchSuggestions: false
};

// Action types
const ACTIONS = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_WEATHER: 'SET_CURRENT_WEATHER',
  SET_FORECAST: 'SET_FORECAST',
  SET_HISTORICAL: 'SET_HISTORICAL',
  SET_MARINE: 'SET_MARINE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_SEARCH_HISTORY: 'SET_SEARCH_HISTORY',
  ADD_TO_SEARCH_HISTORY: 'ADD_TO_SEARCH_HISTORY',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  SET_UNITS: 'SET_UNITS',
  SET_TEMPERATURE_UNIT: 'SET_TEMPERATURE_UNIT',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  TOGGLE_SEARCH_SUGGESTIONS: 'TOGGLE_SEARCH_SUGGESTIONS',
  CLEAR_ERRORS: 'CLEAR_ERRORS'
};

// Reducer function
function weatherReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
      
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.isLoading
        }
      };
      
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.type]: action.payload.error
        }
      };
      
    case ACTIONS.SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
        errors: {
          ...state.errors,
          current: null
        }
      };
      
    case ACTIONS.SET_FORECAST:
      return {
        ...state,
        forecast: action.payload,
        errors: {
          ...state.errors,
          forecast: null
        }
      };
      
    case ACTIONS.SET_HISTORICAL:
      return {
        ...state,
        historical: action.payload,
        errors: {
          ...state.errors,
          historical: null
        }
      };
      
    case ACTIONS.SET_MARINE:
      return {
        ...state,
        marine: action.payload,
        errors: {
          ...state.errors,
          marine: null
        }
      };
      
    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
      
    case ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
      
    case ACTIONS.SET_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: action.payload
      };
      
    case ACTIONS.ADD_TO_SEARCH_HISTORY:
      const newHistory = [action.payload, ...state.searchHistory.filter(item => item !== action.payload)].slice(0, 10);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
      return {
        ...state,
        searchHistory: newHistory
      };
      
    case ACTIONS.SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload
      };
      
    case ACTIONS.SET_UNITS:
      return {
        ...state,
        units: action.payload
      };
      
    case ACTIONS.SET_TEMPERATURE_UNIT:
      return {
        ...state,
        temperatureUnit: action.payload
      };
      
    case ACTIONS.ADD_FAVORITE:
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites
      };
      
    case ACTIONS.REMOVE_FAVORITE:
      const filteredFavorites = state.favorites.filter(fav => fav !== action.payload);
      localStorage.setItem('weatherFavorites', JSON.stringify(filteredFavorites));
      return {
        ...state,
        favorites: filteredFavorites
      };
      
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
      
    case ACTIONS.TOGGLE_SEARCH_SUGGESTIONS:
      return {
        ...state,
        showSearchSuggestions: action.payload !== undefined ? action.payload : !state.showSearchSuggestions
      };
      
    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: initialState.errors
      };
      
    default:
      return state;
  }
}

// Create context
const WeatherContext = createContext();

// Custom hook to use weather context
export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}

// Provider component
export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  
  // Load persisted data from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    const savedFavorites = localStorage.getItem('weatherFavorites');
    
    if (savedHistory) {
      dispatch({
        type: ACTIONS.SET_SEARCH_HISTORY,
        payload: JSON.parse(savedHistory)
      });
    }
    
    if (savedFavorites) {
      dispatch({
        type: ACTIONS.SET_FAVORITES,
        payload: JSON.parse(savedFavorites)
      });
    }
  }, []);
  
  // Action creators
  const setActiveTab = (tab) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab });
  };
  
  const setLoading = (type, isLoading) => {
    dispatch({ 
      type: ACTIONS.SET_LOADING, 
      payload: { type, isLoading } 
    });
  };
  
  const setError = (type, error) => {
    dispatch({ 
      type: ACTIONS.SET_ERROR, 
      payload: { type, error } 
    });
  };
  
  const setCurrentWeather = (data) => {
    dispatch({ type: ACTIONS.SET_CURRENT_WEATHER, payload: data });
  };
  
  const setForecast = (data) => {
    dispatch({ type: ACTIONS.SET_FORECAST, payload: data });
  };
  
  const setHistorical = (data) => {
    dispatch({ type: ACTIONS.SET_HISTORICAL, payload: data });
  };
  
  const setMarine = (data) => {
    dispatch({ type: ACTIONS.SET_MARINE, payload: data });
  };
  
  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
  };
  
  const setSearchResults = (results) => {
    dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: results });
  };
  
  const addToSearchHistory = (query) => {
    dispatch({ type: ACTIONS.ADD_TO_SEARCH_HISTORY, payload: query });
  };
  
  const setSelectedLocation = (location) => {
    dispatch({ type: ACTIONS.SET_SELECTED_LOCATION, payload: location });
  };
  
  const setUnits = (units) => {
    dispatch({ type: ACTIONS.SET_UNITS, payload: units });
  };
  
  const setTemperatureUnit = (unit) => {
    dispatch({ type: ACTIONS.SET_TEMPERATURE_UNIT, payload: unit });
  };
  
  const addFavorite = (location) => {
    dispatch({ type: ACTIONS.ADD_FAVORITE, payload: location });
  };
  
  const removeFavorite = (location) => {
    dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: location });
  };
  
  const toggleSidebar = () => {
    dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
  };
  
  const toggleSearchSuggestions = (show) => {
    dispatch({ type: ACTIONS.TOGGLE_SEARCH_SUGGESTIONS, payload: show });
  };
  
  const clearErrors = () => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS });
  };
  
  // API methods
  const fetchCurrentWeather = async (query) => {
    console.log('fetchCurrentWeather called with:', query);
    setLoading('current', true);
    setError('current', null);
    
    try {
      const data = await WeatherService.getCurrentWeather(query);
      console.log('Weather data received:', data);
      setCurrentWeather(data);
      setSelectedLocation(query);
      addToSearchHistory(query);
      return data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('current', error.message);
      throw error;
    } finally {
      setLoading('current', false);
    }
  };
  
  const fetchForecast = async (query, days = 7) => {
    setLoading('forecast', true);
    setError('forecast', null);
    
    try {
      const data = await WeatherService.getForecast(query, days);
      setForecast(data);
      return data;
    } catch (error) {
      setError('forecast', error.message);
      throw error;
    } finally {
      setLoading('forecast', false);
    }
  };
  
  const fetchHistorical = async (query, startDate, endDate) => {
    setLoading('historical', true);
    setError('historical', null);
    
    try {
      const data = await WeatherService.getHistoricalWeatherRange(query, startDate, endDate);
      setHistorical(data);
      return data;
    } catch (error) {
      setError('historical', error.message);
      throw error;
    } finally {
      setLoading('historical', false);
    }
  };
  
  const fetchMarine = async (lat, lon) => {
    setLoading('marine', true);
    setError('marine', null);
    
    try {
      const data = await WeatherService.getMarineWeather(lat, lon);
      setMarine(data);
      return data;
    } catch (error) {
      setError('marine', error.message);
      throw error;
    } finally {
      setLoading('marine', false);
    }
  };
  
  const searchLocations = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setLoading('locations', true);
    setError('locations', null);
    
    try {
      const results = await WeatherService.getLocationSuggestions(query);
      setSearchResults(results);
      return results;
    } catch (error) {
      setError('locations', error.message);
      setSearchResults([]);
    } finally {
      setLoading('locations', false);
    }
  };
  
  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    setActiveTab,
    setLoading,
    setError,
    setCurrentWeather,
    setForecast,
    setHistorical,
    setMarine,
    setSearchQuery,
    setSearchResults,
    addToSearchHistory,
    setSelectedLocation,
    setUnits,
    setTemperatureUnit,
    addFavorite,
    removeFavorite,
    toggleSidebar,
    toggleSearchSuggestions,
    clearErrors,
    
    // API Methods
    fetchCurrentWeather,
    fetchForecast,
    fetchHistorical,
    fetchMarine,
    searchLocations
  };
  
  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};