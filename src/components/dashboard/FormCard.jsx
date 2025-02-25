// src/components/dashboard/FormCard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/dateUtils';

const FormCard = ({ form, view = 'grid', onDelete, onDuplicate }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/forms/${form.id}`);
  };
  
  const handleDuplicate = (e) => {
    e.stopPropagation();
    if (onDuplicate) {
      onDuplicate(form.id);
    }
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Are you sure you want to delete this form?')) {
      onDelete(form.id);
    }
  };
  
  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setShowActions(!showActions);
  };
  
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  
  // Get relative time for last edit
  const getRelativeTime = () => {
    if (!form.updatedAt) return '';
    
    return `Last edited ${formatRelativeTime(form.updatedAt)}`;
  };
  
  // Get form status
  const getFormStatus = () => {
    if (form.isTemplate) return 'template';
    if (form.isPublished) return 'published';
    return 'draft';
  };
  
  // Get responses text
  const getResponsesText = () => {
    if (form.responses === undefined || form.responses === null) return 'No data';
    
    return `${form.responses} response${form.responses !== 1 ? 's' : ''}`;
  };
  
  // Grid view (default)
  if (view === 'grid') {
    return (
      <div 
        className="form-card"
        onClick={handleCardClick}
      >
        <div 
          className="form-card-header"
          style={{ backgroundColor: form.thumbnail || '#6366f1' }}
        >
          <h3 className="form-card-title">{form.title || 'Untitled Form'}</h3>
        </div>
        
        <div className="form-card-body">
          <div className="form-card-status-container">
            <span className={`form-card-status ${getFormStatus()}`}>
              {getFormStatus() === 'published' ? 'Published' : 
               getFormStatus() === 'draft' ? 'Draft' : 'Template'}
            </span>
          </div>
          
          <div className="form-card-meta">
            <span className="form-card-date">
              Created {formatRelativeTime(form.createdAt)}
            </span>
          </div>
          
          <div className="form-card-responses">
            {getResponsesText()}
          </div>
          
          <div className="form-card-last-edit">
            {getRelativeTime()}
          </div>
        </div>
        
        <div className="form-card-actions">
          <div className="form-card-menu-container">
            <button
              className="btn-menu"
              onClick={handleToggleMenu}
              aria-label="More actions"
            >
              ⋮
            </button>
            
            {showActions && (
              <div className="form-card-dropdown" onClick={stopPropagation}>
                <Link to={`/forms/${form.id}`} className="dropdown-item">
                  <span className="dropdown-icon">✏️</span>
                  <span>Edit</span>
                </Link>
                
                <Link to={`/preview/${form.id}?preview=true`} className="dropdown-item">
                  <span className="dropdown-icon">👁️</span>
                  <span>Preview</span>
                </Link>
                
                <button className="dropdown-item" onClick={handleDuplicate}>
                  <span className="dropdown-icon">📋</span>
                  <span>Duplicate</span>
                </button>
                
                <button className="dropdown-item" onClick={handleDelete}>
                  <span className="dropdown-icon">🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // List view
  return (
    <div 
      className="form-card list-view-card"
      onClick={handleCardClick}
    >
      <div 
        className="list-card-color-indicator"
        style={{ backgroundColor: form.thumbnail || '#6366f1' }}
      ></div>
      
      <div className="list-card-main">
        <div className="list-card-title">
          <h3>{form.title || 'Untitled Form'}</h3>
          <span className={`form-card-status ${getFormStatus()}`}>
            {getFormStatus() === 'published' ? 'Published' : 
             getFormStatus() === 'draft' ? 'Draft' : 'Template'}
          </span>
        </div>
        
        <div className="list-card-meta">
          <span className="list-card-created">
            Created {formatRelativeTime(form.createdAt)}
          </span>
          <span className="list-card-separator">•</span>
          <span className="list-card-edited">
            {getRelativeTime()}
          </span>
        </div>
      </div>
      
      <div className="list-card-responses">
        {getResponsesText()}
      </div>
      
      <div className="list-card-actions">
        <Link 
          to={`/preview/${form.id}?preview=true`} 
          className="list-action-btn"
          onClick={stopPropagation}
          title="Preview"
        >
          👁️
        </Link>
        
        <button
          className="list-action-btn"
          onClick={handleDuplicate}
          title="Duplicate"
        >
          📋
        </button>
        
        <button
          className="list-action-btn"
          onClick={handleDelete}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default FormCard;
