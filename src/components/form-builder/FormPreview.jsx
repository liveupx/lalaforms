// src/components/form-builder/FormPreview.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiEdit2, FiTrash2, FiMove, FiEye } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Import form element components
const TextInput = ({ label, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder || ''}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const CheckboxInput = ({ label, required }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  </div>
);

const SelectInput = ({ label, options, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">Select an option</option>
      {options && options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const DateInput = ({ label, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="date"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const TextAreaInput = ({ label, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      placeholder={placeholder || ''}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Component mappings
const componentMap = {
  text: TextInput,
  checkbox: CheckboxInput,
  select: SelectInput,
  date: DateInput,
  textarea: TextAreaInput,
};

const FormPreview = ({ 
  blocks, 
  selectedBlockId, 
  onSelectBlock, 
  onReorderBlocks, 
  onDeleteBlock,
  readOnly = false
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    
    onReorderBlocks(startIndex, endIndex);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px] relative">
      {blocks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-center">
            Drag form elements here to start building your form
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="formPreview">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="space-y-4"
              >
                {blocks.map((block, index) => {
                  const FormComponent = componentMap[block.type] || (() => <div>Unknown component type</div>);
                  
                  return (
                    <Draggable 
                      key={block.id} 
                      draggableId={block.id} 
                      index={index}
                      isDragDisabled={readOnly}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            relative p-4 rounded-md border 
                            ${selectedBlockId === block.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} 
                            ${snapshot.isDragging ? 'bg-blue-50' : 'bg-white'}
                            ${!readOnly ? 'hover:border-blue-300 cursor-pointer' : ''}
                          `}
                          onClick={() => !readOnly && onSelectBlock(block.id)}
                        >
                          {!readOnly && (
                            <div className="absolute right-2 top-2 flex space-x-1">
                              <div 
                                {...provided.dragHandleProps}
                                className="cursor-move p-1 rounded hover:bg-gray-100"
                                title="Drag to reorder"
                              >
                                <FiMove size={16} className="text-gray-500" />
                              </div>
                              <button 
                                className="p-1 rounded hover:bg-gray-100"
                                title="Edit element"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectBlock(block.id);
                                }}
                              >
                                <FiEdit2 size={16} className="text-gray-500" />
                              </button>
                              <button 
                                className="p-1 rounded hover:bg-gray-100"
                                title="Delete element"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteBlock(block.id);
                                }}
                              >
                                <FiTrash2 size={16} className="text-gray-500" />
                              </button>
                            </div>
                          )}
                          <FormComponent {...block.settings} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      
      {readOnly && (
        <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm">
          <FiEye className="mr-1" />
          Preview Mode
        </div>
      )}
    </div>
  );
};

FormPreview.propTypes = {
  blocks: PropTypes.array.isRequired,
  selectedBlockId: PropTypes.string,
  onSelectBlock: PropTypes.func,
  onReorderBlocks: PropTypes.func,
  onDeleteBlock: PropTypes.func,
  readOnly: PropTypes.bool
};

export default FormPreview;