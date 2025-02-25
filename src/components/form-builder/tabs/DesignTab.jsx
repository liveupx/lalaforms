// src/components/form-builder/tabs/DesignTab.jsx
import React, { useState } from 'react';
import ColorPicker from '../../common/ColorPicker';
import ThemeGalleryComponent from '../ThemeGallery';
import FormDesignPreviewComponent from '../FormDesignPreview';

const DesignTab = ({ formData, updateFormField }) => {
  const [showThemeGallery, setShowThemeGallery] = useState(false);
  
  // Default design settings if none exist
  const designSettings = formData.design || {
    theme: 'default',
    colors: {
      background: '#ffffff',
      primary: '#6366f1',
      text: '#1e293b',
      questionText: '#1e293b',
      answerText: '#64748b',
      buttonBackground: '#6366f1',
      buttonText: '#ffffff'
    },
    font: 'Inter',
    fontSize: 'medium',
    backgroundImage: null,
    brightness: 1,
    logo: null,
    roundCorners: true
  };
  
  // Handle design field updates
  const handleDesignUpdate = (field, value) => {
    const updatedDesign = {
      ...designSettings,
      [field]: value
    };
    updateFormField('design', updatedDesign);
  };
  
  // Handle color updates
  const handleColorUpdate = (colorField, value) => {
    const updatedColors = {
      ...designSettings.colors,
      [colorField]: value
    };
    
    const updatedDesign = {
      ...designSettings,
      colors: updatedColors
    };
    
    updateFormField('design', updatedDesign);
  };
  
  // Apply a theme
  const handleApplyTheme = (theme) => {
    // This would merge theme settings with current settings
    const updatedDesign = {
      ...designSettings,
      theme: theme.id,
      colors: {
        ...designSettings.colors,
        ...theme.colors
      }
    };
    
    updateFormField('design', updatedDesign);
    setShowThemeGallery(false);
  };
  
  return (
    <div className="design-tab">
      {showThemeGallery ? (
        <ThemeGalleryComponent 
          onApplyTheme={handleApplyTheme}
          onCancel={() => setShowThemeGallery(false)}
          currentTheme={designSettings.theme}
        />
      ) : (
        <div className="design-options">
          <div className="design-section">
            <h3 className="design-section-title">Theme</h3>
            <button 
              className="btn btn-outline btn-block"
              onClick={() => setShowThemeGallery(true)}
            >
              Open Theme Gallery
            </button>
            <p className="design-section-help">
              Choose from handpicked designs or customize your own.
            </p>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Background</h3>
            <div className="color-picker-group">
              <label>Color</label>
              <ColorPicker 
                color={designSettings.colors.background}
                onChange={(color) => handleColorUpdate('background', color)}
              />
            </div>
            
            <div className="form-group">
              <label>Background Image</label>
              <div className="image-upload-container">
                {designSettings.backgroundImage ? (
                  <div className="uploaded-image-preview">
                    <img 
                      src={designSettings.backgroundImage} 
                      alt="Background"
                    />
                    <button 
                      className="remove-image-btn"
                      onClick={() => handleDesignUpdate('backgroundImage', null)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline btn-upload"
                    onClick={() => {/* Image upload logic */}}
                  >
                    Upload Image
                  </button>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label>Brightness</label>
              <input 
                type="range" 
                min="0.2" 
                max="1" 
                step="0.1"
                value={designSettings.brightness}
                onChange={(e) => handleDesignUpdate('brightness', parseFloat(e.target.value))}
                className="range-slider"
              />
              <div className="range-labels">
                <span>Darker</span>
                <span>Lighter</span>
              </div>
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Questions</h3>
            <div className="color-picker-group">
              <label>Text Color</label>
              <ColorPicker 
                color={designSettings.colors.questionText}
                onChange={(color) => handleColorUpdate('questionText', color)}
              />
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Answers</h3>
            <div className="color-picker-group">
              <label>Text Color</label>
              <ColorPicker 
                color={designSettings.colors.answerText}
                onChange={(color) => handleColorUpdate('answerText', color)}
              />
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Buttons</h3>
            <div className="color-picker-group">
              <label>Background Color</label>
              <ColorPicker 
                color={designSettings.colors.buttonBackground}
                onChange={(color) => handleColorUpdate('buttonBackground', color)}
              />
            </div>
            
            <div className="color-picker-group">
              <label>Text Color</label>
              <ColorPicker 
                color={designSettings.colors.buttonText}
                onChange={(color) => handleColorUpdate('buttonText', color)}
              />
            </div>
            
            <div className="form-group">
              <label>Button Text</label>
              <input 
                type="text"
                className="form-control"
                value={formData.buttonText || 'Next'}
                onChange={(e) => updateFormField('buttonText', e.target.value)}
                placeholder="Next"
              />
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Star Rating</h3>
            <div className="color-picker-group">
              <label>Star Color</label>
              <ColorPicker 
                color={designSettings.colors.primary}
                onChange={(color) => handleColorUpdate('primary', color)}
              />
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Font</h3>
            <div className="form-group">
              <select 
                className="form-control"
                value={designSettings.font}
                onChange={(e) => handleDesignUpdate('font', e.target.value)}
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Logo</h3>
            <div className="pro-feature-container">
              <div className="image-upload-container">
                {designSettings.logo ? (
                  <div className="uploaded-image-preview">
                    <img 
                      src={designSettings.logo} 
                      alt="Logo"
                    />
                    <button 
                      className="remove-image-btn"
                      onClick={() => handleDesignUpdate('logo', null)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline btn-upload"
                    onClick={() => {/* Logo upload logic */}}
                  >
                    Select your logo
                  </button>
                )}
              </div>
              <div className="pro-badge">PRO</div>
            </div>
          </div>
          
          <div className="design-section">
            <h3 className="design-section-title">Round corners</h3>
            <div className="form-switch">
              <input 
                type="checkbox"
                id="round-corners"
                checked={designSettings.roundCorners}
                onChange={(e) => handleDesignUpdate('roundCorners', e.target.checked)}
              />
              <label htmlFor="round-corners" className="switch-label"></label>
            </div>
          </div>
          
          <div className="design-note">
            <p>Note: Any changes made in the Design tab will be saved & published automatically.</p>
          </div>
        </div>
      )}
      
      <div className="design-preview">
        <FormDesignPreviewComponent 
          formData={formData}
          designSettings={designSettings}
        />
      </div>
    </div>
  );
};

export default DesignTab;