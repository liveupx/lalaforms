// src/components/common/ColorPicker.jsx
import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef(null);
  
  // Predefined colors
  const presetColors = [
    // Primary colors
    '#6366f1', // Indigo (Default)
    '#ef4444', // Red
    '#f97316', // Orange
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    
    // Shades
    '#111827', // Gray 900
    '#1f2937', // Gray 800
    '#374151', // Gray 700
    '#4b5563', // Gray 600
    '#6b7280', // Gray 500
    '#9ca3af', // Gray 400
    '#d1d5db', // Gray 300
    '#f3f4f6'  // Gray 100
  ];
  
  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle color picker
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle color selection from presets
  const handlePresetSelect = (presetColor) => {
    onChange(presetColor);
    setIsOpen(false);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="color-picker" ref={colorPickerRef}>
      <div className="color-display" onClick={handleToggle}>
        <div 
          className="color-preview" 
          style={{ backgroundColor: color }}
        ></div>
        <div className="color-value">{color}</div>
        <div className="toggle-icon">{isOpen ? '▲' : '▼'}</div>
      </div>
      
      {isOpen && (
        <div className="color-dropdown">
          <div className="color-input-container">
            <input
              type="color"
              value={color}
              onChange={handleInputChange}
              className="color-input"
            />
            <input
              type="text"
              value={color}
              onChange={handleInputChange}
              className="color-text-input"
            />
          </div>
          
          <div className="preset-colors">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className={`preset-color ${presetColor === color ? 'active' : ''}`}
                style={{ backgroundColor: presetColor }}
                onClick={() => handlePresetSelect(presetColor)}
                title={presetColor}
              ></button>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .color-picker {
          position: relative;
          width: 100%;
        }
        
        .color-display {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border: 1px solid var(--gray-light);
          border-radius: var(--border-radius);
          cursor: pointer;
          background-color: white;
          transition: all 0.2s ease;
        }
        
        .color-display:hover {
          border-color: var(--primary);
        }
        
        .color-preview {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .color-value {
          flex: 1;
          font-size: 14px;
          color: var(--gray-dark);
        }
        
        .toggle-icon {
          color: var(--gray);
          font-size: 12px;
        }
        
        .color-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 4px;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          z-index: 10;
          padding: 16px;
        }
        
        .color-input-container {
          display: flex;
          margin-bottom: 16px;
          gap: 12px;
        }
        
        .color-input {
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid var(--gray-light);
          border-radius: 4px;
          cursor: pointer;
        }
        
        .color-text-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--gray-light);
          border-radius: var(--border-radius);
          font-size: 14px;
        }
        
        .color-text-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .preset-colors {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 8px;
        }
        
        .preset-color {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .preset-color:hover {
          transform: scale(1.1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .preset-color.active {
          border: 2px solid var(--dark);
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ColorPicker;
