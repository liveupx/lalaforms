// src/components/form-builder/BlockSettings.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const BlockSettings = ({ block, onUpdateBlock, onDeleteBlock }) => {
  const handleChange = (key, value) => {
    onUpdateBlock({
      ...block,
      settings: {
        ...block.settings,
        [key]: value
      }
    });
  };

  const addOption = () => {
    const options = [...(block.settings.options || []), `Option ${(block.settings.options || []).length + 1}`];
    handleChange('options', options);
  };

  const updateOption = (index, value) => {
    const options = [...(block.settings.options || [])];
    options[index] = value;
    handleChange('options', options);
  };

  const removeOption = (index) => {
    const options = [...(block.settings.options || [])];
    options.splice(index, 1);
    handleChange('options', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Element Settings</h3>
        <button
          className="text-red-500 hover:text-red-700 p-1"
          onClick={() => onDeleteBlock(block.id)}
          title="Delete element"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Label settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={block.settings.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Placeholder settings (for text inputs) */}
        {['text', 'textarea', 'email', 'phone'].includes(block.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={block.settings.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Required setting */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={block.settings.required || false}
            onChange={(e) => handleChange('required', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
            Required field
          </label>
        </div>

        {/* Options for select, radio, checkbox group */}
        {['select', 'radio', 'checkbox-group'].includes(block.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="space-y-2">
              {(block.settings.options || []).map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className="ml-2 text-red-500 hover:text-red-700 p-1"
                    onClick={() => removeOption(index)}
                    title="Remove option"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
                onClick={addOption}
              >
                <FiPlus size={16} className="mr-1" />
                Add Option
              </button>
            </div>
          </div>
        )}

        {/* Additional settings based on field type */}
        {block.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validation
            </label>
            <select
              value={block.settings.validation || 'none'}
              onChange={(e) => handleChange('validation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="email">Email</option>
              <option value="url">URL</option>
              <option value="numeric">Numeric</option>
              <option value="alphanumeric">Alphanumeric</option>
            </select>
          </div>
        )}

        {/* Help text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Help Text
          </label>
          <input
            type="text"
            value={block.settings.helpText || ''}
            onChange={(e) => handleChange('helpText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional help text for this field"
          />
        </div>
      </div>
    </div>
  );
};

BlockSettings.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  }).isRequired,
  onUpdateBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired
};

export default BlockSettings;