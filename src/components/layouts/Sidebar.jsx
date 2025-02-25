// src/components/layouts/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  
  // Define sidebar navigation items
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard',
      isActive: location.pathname === '/dashboard'
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: '📋',
      path: '/templates',
      isActive: location.pathname === '/templates'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: '🔌',
      path: '/integrations',
      isActive: location.pathname === '/integrations'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      path: '/settings',
      isActive: location.pathname === '/settings'
    }
  ];
  
  return (
    <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Logo collapsed={isCollapsed} />
        </div>
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${item.isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          {!isCollapsed && (
            <div className="user-details">
              <span className="user-name">John Doe</span>
              <span className="user-email">john@example.com</span>
            </div>
          )}
          <div className="user-avatar">JD</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
