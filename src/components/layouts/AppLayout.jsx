// src/components/layouts/AppLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import '../../styles/app-layout.css';

const AppLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // Check if we're on a form builder page to hide sidebar
  const isBuilderPage = location.pathname.includes('/forms/') && 
                       !location.pathname.includes('/dashboard');
  
  return (
    <div className={`app-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''} ${isBuilderPage ? 'builder-mode' : ''}`}>
      {!isBuilderPage && (
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
      )}
      
      <div className="app-main">
        {!isBuilderPage && <AppHeader />}
        
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
