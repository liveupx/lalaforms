// src/components/common/EmptyState.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  secondaryAction,
  centered = true
}) => {
  // Render primary action
  const renderAction = () => {
    if (!action) return null;
    
    // If action has a link
    if (action.to) {
      return (
        <Link 
          to={action.to} 
          className="btn btn-primary empty-state-action"
        >
          {action.text}
        </Link>
      );
    }
    
    // If action has an onClick handler
    if (action.onClick) {
      return (
        <button 
          className="btn btn-primary empty-state-action" 
          onClick={action.onClick}
        >
          {action.text}
        </button>
      );
    }
    
    return null;
  };
  
  // Render secondary action
  const renderSecondaryAction = () => {
    if (!secondaryAction) return null;
    
    // If secondary action has a link
    if (secondaryAction.to) {
      return (
        <Link 
          to={secondaryAction.to} 
          className="btn btn-outline empty-state-action"
        >
          {secondaryAction.text}
        </Link>
      );
    }
    
    // If secondary action has an onClick handler
    if (secondaryAction.onClick) {
      return (
        <button 
          className="btn btn-outline empty-state-action" 
          onClick={secondaryAction.onClick}
        >
          {secondaryAction.text}
        </button>
      );
    }
    
    return null;
  };
  
  return (
    <div className={`empty-state ${centered ? 'centered' : ''}`}>
      {icon && (
        <div className="empty-state-icon">
          {icon}
        </div>
      )}
      
      <h3 className="empty-state-title">
        {title}
      </h3>
      
      {description && (
        <p className="empty-state-description">
          {description}
        </p>
      )}
      
      {(action || secondaryAction) && (
        <div className="empty-state-actions">
          {renderAction()}
          {renderSecondaryAction()}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
