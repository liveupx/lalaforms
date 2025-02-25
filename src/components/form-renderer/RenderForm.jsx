// src/components/form-renderer/RenderForm.jsx
import React, { useState } from 'react';

const RenderForm = ({ block, value, onChange, designSettings }) => {
  // If no block, return empty
  if (!block) {
    return <div className="empty-block">No content to display</div>;
  }
  
  // Get text styles from design settings
  const questionStyle = {
    color: designSettings?.colors?.questionText || '#1e293b',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '16px'
  };
  
  const descriptionStyle = {
    color: designSettings?.colors?.answerText || '#64748b',
    fontSize: '16px',
    marginBottom: '24px'
  };
  
  const inputStyle = {
    color: designSettings?.colors?.answerText || '#64748b',
    borderColor: `${designSettings?.colors?.answerText || '#64748b'}30`,
    borderRadius: designSettings?.roundCorners ? '8px' : '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  };
  
  // Define a reusable required indicator
  const RequiredIndicator = () => (
    <span className="required-indicator" style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
  );
  
  // Render different block types
  const renderBlock = () => {
    switch (block.type) {
      case 'short_text':
        return (
          <div className="form-field short-text-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <input
              type="text"
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={block.placeholder || 'Your answer'}
              required={block.required}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`
              }}
            />
          </div>
        );
        
      case 'long_text':
        return (
          <div className="form-field long-text-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <textarea
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={block.placeholder || 'Your answer'}
              required={block.required}
              rows={5}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`,
                resize: 'vertical'
              }}
            />
          </div>
        );
        
      case 'email':
        return (
          <div className="form-field email-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <input
              type="email"
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={block.placeholder || 'your.email@example.com'}
              required={block.required}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`
              }}
            />
          </div>
        );
        
      case 'phone':
        return (
          <div className="form-field phone-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <input
              type="tel"
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={block.placeholder || 'Your phone number'}
              required={block.required}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`
              }}
            />
          </div>
        );
        
      case 'number':
        return (
          <div className="form-field number-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <input
              type="number"
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={block.placeholder || '0'}
              required={block.required}
              min={block.min}
              max={block.max}
              step={block.step || 1}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`
              }}
            />
          </div>
        );
        
      case 'url':
        return (
          <div className="form-field url-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <input
              type="url"
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={block.placeholder || 'https://example.com'}
              required={block.required}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`
              }}
            />
          </div>
        );
        
      case 'single_choice':
        return (
          <div className="form-field single-choice-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <div className="choices-container">
              {(block.options || []).map((option, index) => (
                <div 
                  key={option.value || index} 
                  className={`choice-item ${value === option.value ? 'selected' : ''}`}
                  style={{
                    marginBottom: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name={`radio-group-${block.id}`}
                      value={option.value}
                      checked={value === option.value}
                      onChange={() => onChange(option.value)}
                      style={{ marginRight: '12px' }}
                    />
                    <span style={{ color: designSettings?.colors?.answerText || '#64748b' }}>
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'multiple_choice':
        const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
        
        return (
          <div className="form-field multiple-choice-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <div className="choices-container">
              {(block.options || []).map((option, index) => (
                <div 
                  key={option.value || index} 
                  className={`choice-item ${selectedValues.includes(option.value) ? 'selected' : ''}`}
                  style={{
                    marginBottom: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      name={`checkbox-group-${block.id}`}
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={(e) => {
                        const newValue = [...selectedValues];
                        if (e.target.checked) {
                          newValue.push(option.value);
                        } else {
                          const index = newValue.indexOf(option.value);
                          if (index > -1) {
                            newValue.splice(index, 1);
                          }
                        }
                        onChange(newValue);
                      }}
                      style={{ marginRight: '12px' }}
                    />
                    <span style={{ color: designSettings?.colors?.answerText || '#64748b' }}>
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'dropdown':
        return (
          <div className="form-field dropdown-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <select
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={block.required}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`,
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}
            >
              <option value="">{block.placeholder || 'Select an option'}</option>
              {(block.options || []).map((option, index) => (
                <option key={option.value || index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
        
      case 'date':
        return (
          <div className="form-field date-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <input
              type={block.includeTime ? 'datetime-local' : 'date'}
              className="field-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={block.required}
              style={{
                ...inputStyle,
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: `1px solid ${inputStyle.borderColor}`
              }}
            />
          </div>
        );
        
      case 'rating':
        const maxRating = block.maxRating || 5;
        const RatingOptions = [];
        for (let i = 1; i <= maxRating; i++) {
          RatingOptions.push(i);
        }
        
        return (
          <div className="form-field rating-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <div 
              className="rating-container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                marginTop: '24px'
              }}
            >
              <div 
                className="stars-container"
                style={{
                  display: 'flex',
                  gap: '12px'
                }}
              >
                {RatingOptions.map(rating => (
                  <button
                    key={rating}
                    type="button"
                    className={`star-button ${Number(value) >= rating ? 'active' : ''}`}
                    onClick={() => onChange(rating)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '32px',
                      cursor: 'pointer',
                      color: Number(value) >= rating ? 
                        designSettings?.colors?.primary || '#6366f1' : 
                        '#d1d5db',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              
              {block.showLabels && (
                <div className="rating-labels">
                  <div 
                    className="labels-container"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      maxWidth: `${maxRating * 44}px`,
                      color: designSettings?.colors?.answerText || '#64748b',
                      fontSize: '14px'
                    }}
                  >
                    <span>{block.startLabel || 'Poor'}</span>
                    <span>{block.endLabel || 'Excellent'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'scale':
        const minValue = block.minValue || 1;
        const maxValue = block.maxValue || 10;
        const ScaleOptions = [];
        for (let i = minValue; i <= maxValue; i++) {
          ScaleOptions.push(i);
        }
        
        return (
          <div className="form-field scale-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <div 
              className="scale-container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                marginTop: '24px'
              }}
            >
              <div 
                className="scale-options"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {ScaleOptions.map(scaleValue => (
                  <button
                    key={scaleValue}
                    type="button"
                    className={`scale-button ${Number(value) === scaleValue ? 'active' : ''}`}
                    onClick={() => onChange(scaleValue)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `1px solid ${Number(value) === scaleValue ? 
                        designSettings?.colors?.primary || '#6366f1' : 
                        inputStyle.borderColor}`,
                      backgroundColor: Number(value) === scaleValue ? 
                        designSettings?.colors?.primary || '#6366f1' : 
                        'transparent',
                      color: Number(value) === scaleValue ? 
                        'white' : 
                        designSettings?.colors?.answerText || '#64748b',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {scaleValue}
                  </button>
                ))}
              </div>
              
              {block.showLabels && (
                <div 
                  className="scale-labels"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    color: designSettings?.colors?.answerText || '#64748b',
                    fontSize: '14px',
                    marginTop: '8px'
                  }}
                >
                  <span>{block.startLabel || 'Not likely'}</span>
                  <span>{block.endLabel || 'Very likely'}</span>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'statement':
        return (
          <div className="form-field statement-field">
            <div 
              className="statement-content"
              style={{
                backgroundColor: `${designSettings?.colors?.primary || '#6366f1'}10`,
                padding: '24px',
                borderRadius: designSettings?.roundCorners ? '8px' : '0px',
                borderLeft: `4px solid ${designSettings?.colors?.primary || '#6366f1'}`
              }}
            >
              <div 
                className="statement-text"
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: designSettings?.colors?.questionText || '#1e293b'
                }}
              >
                {block.content || block.question}
              </div>
              
              {block.showIcon && (
                <div 
                  className="statement-icon"
                  style={{
                    marginBottom: '16px'
                  }}
                >
                  {getStatementIcon(block.icon)}
                </div>
              )}
            </div>
          </div>
        );
        
      case 'file_upload':
        const [fileName, setFileName] = useState('');
        
        const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            setFileName(file.name);
            // In a real app, this would handle the file upload to a server
            // For preview, we'll just store the file name
            onChange(file.name);
          }
        };
        
        return (
          <div className="form-field file-upload-field">
            <label className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </label>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <div 
              className="file-upload-container"
              style={{
                border: `2px dashed ${inputStyle.borderColor}`,
                borderRadius: designSettings?.roundCorners ? '8px' : '0px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              <input
                type="file"
                id={`file-input-${block.id}`}
                onChange={handleFileChange}
                accept={block.allowedFileTypes ? 
                  block.allowedFileTypes.map(type => `.${type}`).join(',') : 
                  undefined}
                style={{ display: 'none' }}
                required={block.required}
              />
              
              {fileName ? (
                <div className="file-selected">
                  <div 
                    className="file-name"
                    style={{
                      marginBottom: '12px',
                      color: designSettings?.colors?.answerText || '#64748b'
                    }}
                  >
                    {fileName}
                  </div>
                  <div className="file-actions">
                    <button
                      type="button"
                      className="btn btn-outline btn-change-file"
                      onClick={() => document.getElementById(`file-input-${block.id}`).click()}
                      style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        marginRight: '8px',
                        borderColor: designSettings?.colors?.primary || '#6366f1',
                        color: designSettings?.colors?.primary || '#6366f1',
                        borderRadius: designSettings?.roundCorners ? '8px' : '0px',
                        cursor: 'pointer'
                      }}
                    >
                      Change File
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-remove-file"
                      onClick={() => {
                        setFileName('');
                        onChange('');
                      }}
                      style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        borderColor: '#ef4444',
                        color: '#ef4444',
                        borderRadius: designSettings?.roundCorners ? '8px' : '0px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div 
                    className="upload-icon"
                    style={{
                      fontSize: '36px',
                      marginBottom: '16px',
                      color: designSettings?.colors?.primary || '#6366f1'
                    }}
                  >
                    📎
                  </div>
                  <div 
                    className="upload-text"
                    style={{
                      marginBottom: '16px',
                      color: designSettings?.colors?.answerText || '#64748b'
                    }}
                  >
                    Drag and drop a file here, or
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-upload"
                    onClick={() => document.getElementById(`file-input-${block.id}`).click()}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: designSettings?.colors?.primary || '#6366f1',
                      color: 'white',
                      borderRadius: designSettings?.roundCorners ? '8px' : '0px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Browse Files
                  </button>
                  {block.maxFileSize && (
                    <div 
                      className="file-constraints"
                      style={{
                        marginTop: '12px',
                        fontSize: '14px',
                        color: designSettings?.colors?.answerText || '#64748b'
                      }}
                    >
                      Maximum file size: {block.maxFileSize}MB
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
        
      // Add more block types as needed
                
      default:
        return (
          <div className="form-field unknown-field">
            <div className="field-label" style={questionStyle}>
              {block.question}
              {block.required && <RequiredIndicator />}
            </div>
            {block.description && (
              <div className="field-description" style={descriptionStyle}>
                {block.description}
              </div>
            )}
            <div 
              className="unsupported-message"
              style={{
                padding: '16px',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                borderRadius: designSettings?.roundCorners ? '8px' : '0px',
                textAlign: 'center'
              }}
            >
              Unsupported field type: {block.type}
            </div>
          </div>
        );
    }
  };
  
  // Helper function to get statement icons
  const getStatementIcon = (iconType) => {
    switch (iconType) {
      case 'info':
        return <span style={{ fontSize: '24px' }}>ℹ️</span>;
      case 'warning':
        return <span style={{ fontSize: '24px' }}>⚠️</span>;
      case 'success':
        return <span style={{ fontSize: '24px' }}>✅</span>;
      case 'error':
        return <span style={{ fontSize: '24px' }}>❌</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="form-block">
      {renderBlock()}
    </div>
  );
};

export default RenderForm;
