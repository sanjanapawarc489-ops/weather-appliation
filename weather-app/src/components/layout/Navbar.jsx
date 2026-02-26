import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { TABS, TAB_LABELS } from '../../utils/constants';
import GlassButton from '../ui/GlassButton';

const Navbar = () => {
  const { activeTab, setActiveTab } = useWeather();

  const tabs = [
    { id: TABS.DASHBOARD, label: TAB_LABELS[TABS.DASHBOARD] },
    { id: TABS.CURRENT, label: TAB_LABELS[TABS.CURRENT] },
    { id: TABS.FORECAST, label: TAB_LABELS[TABS.FORECAST] },
    { id: TABS.HISTORICAL, label: TAB_LABELS[TABS.HISTORICAL] },
    { id: TABS.MARINE, label: TAB_LABELS[TABS.MARINE] },
    { id: TABS.SEARCH, label: TAB_LABELS[TABS.SEARCH] }
  ];

  return (
    <nav className="glass p-4 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            WeatherStack Pro
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <GlassButton
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'tab-active' : 'tab-inactive'}
            >
              {tab.label}
            </GlassButton>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;