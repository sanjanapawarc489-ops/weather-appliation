import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const { activeTab } = useWeather();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar - shown on mobile only */}
      {activeTab === 'dashboard' && (
        <div className="lg:hidden mt-6">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default MainLayout;