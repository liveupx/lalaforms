// src/components/form-builder/ThemeGallery.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';

// Pre-defined themes
const THEMES = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#818cf8',
      background: '#ffffff',
      text: '#1f2937',
    },
    borderRadius: 'rounded-md',
    font: 'font-sans',
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#60a5fa',
      secondary: '#9ca3af',
      accent: '#818cf8',
      background: '#1f2937',
      text: '#f3f4f6',
    },
    borderRadius: 'rounded-md',
    font: 'font-sans',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#6b7280',
      accent: '#4b5563',
      background: '#ffffff',
      text: '#1f2937',
    },
    borderRadius: 'rounded-none',
    font: 'font-sans',
  },
  {
    id: 'colorful',
    name: 'Colorful',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
    },
    borderRadius: 'rounded-xl',
    font: 'font-sans',
  },
  {
    id: 'professional',
    name: 'Professional',
    colors: {
      primary: '#1e40af',
      secondary: '#6b7280',
      accent: '#3b82f6',
      background: '#f3f4f6',
      text: '#1f2937',
    },
    borderRadius: 'rounded-md',
    font: 'font-serif',
  },
  {
    id: 'playful',
    name: 'Playful',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#fffbeb',
      text: '#1f2937',
    },
    borderRadius: 'rounded-full',
    font: 'font-sans',
  },
];

const ThemeGallery = ({ currentTheme, onSelectTheme, onCustomizeTheme }) => {
  // Get the current theme object or default to the first theme
  const activeTheme = THEMES.find(theme => theme.id === currentTheme) || THEMES[0];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Form Themes</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {THEMES.map((theme) => (
          <div 
            key={theme.id} 
            className={`
              p-3 rounded-lg border-2 cursor-pointer
              ${theme.id === activeTheme.id 
                ? 'border-blue-500' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => onSelectTheme(theme.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{theme.name}</span>
              {theme.id === activeTheme.id && (
                <FiCheck className="text-blue-500" size={18} />
              )}
            </div>
            
            <div className="flex space-x-1 mb-2">
              {Object.entries(theme.colors).slice(0, 3).map(([key, color]) => (
                <div 
                  key={key}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                  title={key}
                />
              ))}
            </div>
            
            <div 
              className={`
                w-full h-8 ${theme.borderRadius} flex items-center justify-center
                text-sm ${theme.font}
              `}
              style={{ 
                backgroundColor: theme.colors.primary,
                color: '#fff'
              }}
            >
              Sample Button
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium mb-3">Customize Current Theme</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={activeTheme.colors.primary}
                onChange={(e) => onCustomizeTheme('colors', { ...activeTheme.colors, primary: e.target.value })}
                className="w-10 h-10 p-1 rounded-l-md border border-gray-300"
              />
              <input
                type="text"
                value={activeTheme.colors.primary}
                onChange={(e) => onCustomizeTheme('colors', { ...activeTheme.colors, primary: e.target.value })}
                className="flex-grow px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={activeTheme.colors.background}
                onChange={(e) => onCustomizeTheme('colors', { ...activeTheme.colors, background: e.target.value })}
                className="w-10 h-10 p-1 rounded-l-md border border-gray-300"
              />
              <input
                type="text"
                value={activeTheme.colors.background}
                onChange={(e) => onCustomizeTheme('colors', { ...activeTheme.colors, background: e.target.value })}
                className="flex-grow px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border Radius
            </label>
            <select
              value={activeTheme.borderRadius}
              onChange={(e) => onCustomizeTheme('borderRadius', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rounded-none">None</option>
              <option value="rounded-sm">Small</option>
              <option value="rounded-md">Medium</option>
              <option value="rounded-lg">Large</option>
              <option value="rounded-xl">Extra Large</option>
              <option value="rounded-full">Full</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={activeTheme.font}
              onChange={(e) => onCustomizeTheme('font', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="font-sans">Sans Serif</option>
              <option value="font-serif">Serif</option>
              <option value="font-mono">Monospace</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

ThemeGallery.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  onSelectTheme: PropTypes.func.isRequired,
  onCustomizeTheme: PropTypes.func.isRequired
};

export default ThemeGallery;