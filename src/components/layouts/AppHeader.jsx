// src/components/layouts/AppHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'form_submission',
      message: 'New submission for "Contact Form"',
      time: '10 minutes ago',
      isRead: false
    },
    {
      id: 2,
      type: 'system',
      message: 'Your account has been upgraded to Pro!',
      time: '2 hours ago',
      isRead: true
    },
    {
      id: 3,
      type: 'form_update',
      message: 'Your "Feedback Survey" was updated',
      time: '1 day ago',
      isRead: true
    }
  ];
  
  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  // Toggle notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  
  // Mark notification as read
  const markAsRead = (id) => {
    // This would call an API in a real app
    console.log(`Marked notification ${id} as read`);
  };
  
  return (
    <header className="app-header">
      <div className="header-search">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-actions">
        <Link to="/forms/new" className="btn btn-primary btn-new-form">
          + New Form
        </Link>
        
        <div className="header-icons">
          <div 
            className="notifications-container" 
            ref={notificationsRef}
          >
            <button 
              className="icon-button"
              onClick={toggleNotifications}
              title="Notifications"
            >
              <span className="icon">🔔</span>
              {notifications.some(n => !n.isRead) && (
                <span className="notification-badge"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button className="btn-text">Mark all as read</button>
                </div>
                
                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <div className="empty-notifications">
                      <p>No new notifications</p>
                    </div>
                  ) : (
                    <>
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="notification-icon">
                            {notification.type === 'form_submission' ? '📝' :
                             notification.type === 'system' ? '⚙️' : '🔄'}
                          </div>
                          <div className="notification-content">
                            <p className="notification-message">
                              {notification.message}
                            </p>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      <div className="notifications-footer">
                        <Link to="/notifications" className="btn-text">
                          View all notifications
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div 
            className="user-menu-container" 
            ref={userMenuRef}
          >
            <button 
              className="user-button"
              onClick={toggleUserMenu}
              title="User Menu"
            >
              <div className="user-avatar">JD</div>
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="dropdown-user-avatar">JD</div>
                  <div className="dropdown-user-info">
                    <h4>John Doe</h4>
                    <p>john@example.com</p>
                  </div>
                </div>
                
                <div className="user-dropdown-body">
                  <Link to="/account" className="dropdown-item">
                    <span className="dropdown-item-icon">👤</span>
                    <span>My Account</span>
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <span className="dropdown-item-icon">⚙️</span>
                    <span>Settings</span>
                  </Link>
                  <Link to="/upgrade" className="dropdown-item">
                    <span className="dropdown-item-icon">⭐</span>
                    <span>Upgrade to Pro</span>
                  </Link>
                  <Link to="/help" className="dropdown-item">
                    <span className="dropdown-item-icon">❓</span>
                    <span>Help & Support</span>
                  </Link>
                </div>
                
                <div className="user-dropdown-footer">
                  <button className="btn-logout">
                    <span className="logout-icon">🚪</span>
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
