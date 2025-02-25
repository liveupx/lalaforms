// src/components/common/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ collapsed = false, size = 'default', darkMode = false }) => {
  // Determine size classes
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return {
          logoContainer: 'h-8',
          logoIcon: 'w-8 h-8',
          logoText: 'text-lg'
        };
      case 'large':
        return {
          logoContainer: 'h-12',
          logoIcon: 'w-12 h-12',
          logoText: 'text-2xl'
        };
      default:
        return {
          logoContainer: 'h-10',
          logoIcon: 'w-10 h-10',
          logoText: 'text-xl'
        };
    }
  };
  
  const sizeClass = getSizeClass();
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  
  return (
    <Link 
      to="/" 
      className={`flex items-center ${sizeClass.logoContainer}`}
      style={{ textDecoration: 'none' }}
    >
      <div 
        className={`logo-icon flex items-center justify-center ${sizeClass.logoIcon} rounded-md bg-indigo-500 text-white font-bold mr-2 relative overflow-hidden`}
      >
        {/* Custom logo icon with "L" letter */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <rect width="24" height="24" fill="#6366F1" />
          <path d="M14.5 6H8.5V18H10.5V8H14.5V6Z" fill="white" />
          <path d="M15.5 11.5L13 14L15.5 16.5L17 15L15.5 13.5L17 12L15.5 11.5Z" fill="white" />
        </svg>
      </div>
      
      {!collapsed && (
        <div className={`logo-text font-bold ${sizeClass.logoText} ${textColor}`}>
          <span style={{ color: '#6366F1' }}>Lala</span>
          <span style={{ color: darkMode ? 'white' : '#1E293B' }}>forms</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
