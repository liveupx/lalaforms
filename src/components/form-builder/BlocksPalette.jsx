// src/components/form-builder/BlocksPalette.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FiType, FiCheckSquare, FiList, FiCalendar, FiImage, FiPhone, FiMail, FiFileText, FiStar, FiGrid } from 'react-icons/fi';

const BLOCK_TYPES = [
  { id: 'text', name: 'Text Input', icon: <FiType size={18} />, category: 'basic' },
  { id: 'checkbox', name: 'Checkbox', icon: <FiCheckSquare size={18} />, category: 'basic' },
  { id: 'select', name: 'Dropdown', icon: <FiList size={18} />, category: 'basic' },
  { id: 'date', name: 'Date Picker', icon: <FiCalendar size={18} />, category: 'basic' },
  { id: 'file', name: 'File Upload', icon: <FiImage size={18} />, category: 'advanced' },
  { id: 'phone', name: 'Phone Number', icon: <FiPhone size={18} />, category: 'advanced' },
  { id: 'email', name: 'Email', icon: <FiMail size={18} />, category: 'advanced' },
  { id: 'textarea', name: 'Text Area', icon: <FiFileText size={18} />, category: 'advanced' },
  { id: 'rating', name: 'Rating', icon: <FiStar size={18} />, category: 'advanced' },
  { id: 'grid', name: 'Grid Layout', icon: <FiGrid size={18} />, category: 'layout' },
];

const BlocksPalette = ({ onAddBlock }) => {
  const [selectedCategory, setSelectedCategory] = useState('basic');
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const blockId = result.draggableId;
    const blockType = BLOCK_TYPES.find(block => block.id === blockId);
    
    if (blockType) {
      onAddBlock({
        id: `${blockType.id}_${Date.now()}`,
        type: blockType.id,
        settings: {
          label: `New ${blockType.name}`,
          placeholder: '',
          required: false,
          options: blockType.id === 'select' || blockType.id === 'radio' ? ['Option 1', 'Option 2'] : []
        }
      });
    }
  };

  const filteredBlocks = BLOCK_TYPES.filter(block => block.category === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
      
      <div className="flex mb-4 border-b">
        <button
          className={`px-3 py-2 ${selectedCategory === 'basic' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setSelectedCategory('basic')}
        >
          Basic
        </button>
        <button
          className={`px-3 py-2 ${selectedCategory === 'advanced' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setSelectedCategory('advanced')}
        >
          Advanced
        </button>
        <button
          className={`px-3 py-2 ${selectedCategory === 'layout' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setSelectedCategory('layout')}
        >
          Layout
        </button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blockPalette" isDropDisabled={true}>
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2"
            >
              {filteredBlocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`
                        p-3 rounded-md border border-gray-200 
                        flex items-center space-x-3 
                        ${snapshot.isDragging ? 'bg-blue-50' : 'bg-white'} 
                        cursor-grab hover:bg-gray-50 transition-colors
                      `}
                    >
                      <div className="text-blue-500">{block.icon}</div>
                      <span>{block.name}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">Drag elements to add them to your form</p>
      </div>
    </div>
  );
};

BlocksPalette.propTypes = {
  onAddBlock: PropTypes.func.isRequired
};

export default BlocksPalette;