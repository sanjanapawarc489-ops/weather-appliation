import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CurrentWeather from './pages/CurrentWeather';
import ForecastDemo from './pages/ForecastDemo';
import HistoricalDemo from './pages/HistoricalDemo';
import MarineDemo from './pages/MarineDemo';
import Search from './pages/Search';
import { useWeather } from './context/WeatherContext';
import { TABS } from './utils/constants';

const AppContent = () => {
  const { activeTab } = useWeather();

  const renderActiveTab = () => {
    switch (activeTab) {
      case TABS.DASHBOARD:
        return <Dashboard />;
      case TABS.CURRENT:
        return <CurrentWeather />;
      case TABS.FORECAST:
        return <ForecastDemo />;
      case TABS.HISTORICAL:
        return <HistoricalDemo />;
      case TABS.MARINE:
        return <MarineDemo />;
      case TABS.SEARCH:
        return <Search />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout>
      {renderActiveTab()}
    </MainLayout>
  );
};

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;