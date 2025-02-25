// src/components/form-builder/BuilderHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { formatRelativeTime } from '../../utils/dateUtils';

const BuilderHeader = ({ 
  formTitle, 
  updateFormTitle, 
  isSaving, 
  lastSaved, 
  isPublished, 
  onPublish, 
  onPreview, 
  onBack,
  hasUnsavedChanges
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(formTitle);
  const titleInputRef = useRef(null);
  
  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      // Select all text
      titleInputRef.current.select();
    }
  }, [isEditing]);
  
  // Update title value when formTitle prop changes
  useEffect(() => {
    setTitleValue(formTitle);
  }, [formTitle]);
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    setIsEditing(true);
  };
  
  // Handle title input change
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };
  
  // Handle title save
  const handleTitleSave = () => {
    if (titleValue.trim()) {
      updateFormTitle(titleValue);
    } else {
      setTitleValue(formTitle); // Reset to previous value if empty
    }
    setIsEditing(false);
  };
  
  // Handle key press in title input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTitleValue(formTitle); // Reset to previous value
      setIsEditing(false);
    }
  };
  
  // Handle click outside title input
  const handleBlur = () => {
    handleTitleSave();
  };
  
  // Get save status text
  const getSaveStatusText = () => {
    if (isSaving) {
      return 'Saving...';
    }
    
    if (hasUnsavedChanges) {
      return 'Unsaved changes';
    }
    
    if (lastSaved) {
      return `All changes saved ${formatRelativeTime(lastSaved)}`;
    }
    
    return 'All changes saved';
  };
  
  return (
    <div className="builder-header">
      <div className="builder-header-left">
        <button 
          className="back-button"
          onClick={onBack}
          title="Back to Dashboard"
        >
          ←
        </button>
        
        {isEditing ? (
          <input
            ref={titleInputRef}
            type="text"
            className="form-title-input"
            value={titleValue}
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            maxLength={100}
          />
        ) : (
          <h1 
            className="form-title"
            onClick={handleEditToggle}
            title="Click to edit"
          >
            {formTitle || 'Untitled Form'}
          </h1>
        )}
        
        <div className="save-status">
          {isSaving && <span className="save-spinner"></span>}
          <span className="save-status-text">{getSaveStatusText()}</span>
        </div>
      </div>
      
      <div className="builder-header-right">
        <div className={`publish-status ${isPublished ? 'published' : 'draft'}`}>
          {isPublished ? 'Published' : 'Draft'}
        </div>
        
        <button 
          className="btn btn-outline btn-preview"
          onClick={onPreview}
        >
          <span className="btn-icon">👁️</span> Preview
        </button>
        
        <button 
          className="btn btn-primary btn-publish"
          onClick={onPublish}
        >
          {isPublished ? 'Update' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default BuilderHeader;
