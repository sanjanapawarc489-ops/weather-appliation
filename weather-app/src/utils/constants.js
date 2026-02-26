export const WEATHERSTACK_API_KEY = 'b2cbadd8e27d068ed379b3c6650f94fa';
export const WEATHERSTACK_BASE_URL = 'https://api.weatherstack.com';

export const API_ENDPOINTS = {
  CURRENT: '/current',
  FORECAST: '/forecast',
  HISTORICAL: '/historical',
  MARINE: '/marine',
  LOCATIONS: '/locations'
};

export const DEFAULT_UNITS = 'm'; // m for metric, s for scientific, f for fahrenheit
export const DEFAULT_LANGUAGE = 'en';

export const WEATHER_ICONS = {
  clear: '☀️',
  cloudy: '☁️',
  rainy: '🌧️',
  snowy: '❄️',
  thunder: '⛈️',
  mist: '🌫️',
  fog: '🌫️',
  haze: '🌫️',
  sunny: '☀️',
  partly_cloudy: '⛅',
  overcast: '☁️'
};

export const TABS = {
  DASHBOARD: 'dashboard',
  CURRENT: 'current',
  FORECAST: 'forecast',
  HISTORICAL: 'historical',
  MARINE: 'marine',
  SEARCH: 'search'
};

export const TAB_LABELS = {
  [TABS.DASHBOARD]: 'Dashboard',
  [TABS.CURRENT]: 'Current Weather',
  [TABS.FORECAST]: 'Forecast',
  [TABS.HISTORICAL]: 'Historical',
  [TABS.MARINE]: 'Marine Weather',
  [TABS.SEARCH]: 'Search'
};
