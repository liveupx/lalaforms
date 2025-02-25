// src/components/form-builder/tabs/BuildTab.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiPlus, FiEye, FiSettings, FiSliders } from 'react-icons/fi';

import IconButton from '../../common/IconButton';
import BlocksPalette from '../BlocksPalette';
import FormPreview from '../FormPreview';
import BlockSettings from '../BlockSettings';
import LogicBuilder from '../LogicBuilder';

const BuildTab = ({ form, onUpdateForm }) => {
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [showLogicBuilder, setShowLogicBuilder] = useState(false);
  
  const selectedBlock = form.blocks.find(block => block.id === selectedBlockId);
  
  const handleAddBlock = (newBlock) => {
    onUpdateForm({
      ...form,
      blocks: [...form.blocks, newBlock]
    });
    setSelectedBlockId(newBlock.id);
  };
  
  const handleUpdateBlock = (updatedBlock) => {
    onUpdateForm({
      ...form,
      blocks: form.blocks.map(block => 
        block.id === updatedBlock.id ? updatedBlock : block
      )
    });
  };
  
  const handleDeleteBlock = (blockId) => {
    onUpdateForm({
      ...form,
      blocks: form.blocks.filter(block => block.id !== blockId)
    });
    
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };
  
  const handleReorderBlocks = (startIndex, endIndex) => {
    const result = Array.from(form.blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    onUpdateForm({
      ...form,
      blocks: result
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left sidebar - Form elements palette */}
      <div className="col-span-3">
        <BlocksPalette onAddBlock={handleAddBlock} />
      </div>
      
      {/* Center - Form preview */}
      <div className="col-span-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Form Builder</h3>
          <div className="flex space-x-2">
            <IconButton 
              icon={<FiSliders size={18} />} 
              variant={showLogicBuilder ? "primary" : "secondary"}
              onClick={() => setShowLogicBuilder(!showLogicBuilder)}
              title="Form Logic"
            />
            <IconButton 
              icon={<FiEye size={18} />} 
              variant="secondary"
              title="Preview Form"
              onClick={() => window.open(`/preview/${form.id}`, '_blank')}
            />
          </div>
        </div>
        
        <FormPreview 
          blocks={form.blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onReorderBlocks={handleReorderBlocks}
          onDeleteBlock={handleDeleteBlock}
        />
      </div>
      
      {/* Right sidebar - Block settings or logic builder */}
      <div className="col-span-3">
        {showLogicBuilder ? (
          <LogicBuilder 
            form={form}
            onUpdateForm={onUpdateForm}
            onClose={() => setShowLogicBuilder(false)}
          />
        ) : selectedBlock ? (
          <BlockSettings
            block={selectedBlock}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 h-full flex items-center justify-center">
            <div className="text-center">
              <FiSettings size={32} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                Select a form element to edit its settings
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

BuildTab.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    blocks: PropTypes.array
  }).isRequired,
  onUpdateForm: PropTypes.func.isRequired
};

export default BuildTab;