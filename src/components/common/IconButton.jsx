// src/components/common/IconButton.jsx
import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({ 
  icon, 
  onClick, 
  className = '', 
  title = '', 
  disabled = false,
  size = 'md',
  variant = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    transparent: 'bg-transparent hover:bg-gray-100'
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-full 
        flex 
        items-center 
        justify-center 
        transition-colors 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
        ${className}
      `}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'transparent'])
};

export default IconButton;