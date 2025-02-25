// src/components/form-builder/BuilderTabs.jsx
import React from 'react';

const BuilderTabs = ({ activeTab, onTabChange }) => {
  // Define tabs with their icons and labels
  const tabs = [
    { id: 'build', label: 'Build', icon: '🛠️' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'integrate', label: 'Integrate', icon: '🔄' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'share', label: 'Share', icon: '📤' },
    { id: 'results', label: 'Results', icon: '📊' }
  ];
  
  return (
    <div className="builder-tabs">
      {tabs.map(tab => (
        <div 
          key={tab.id} 
          className={`builder-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BuilderTabs;
