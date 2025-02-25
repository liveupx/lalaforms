// src/hooks/useFormData.js
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchFormById, createEmptyForm } from '../services/formService';

const useFormData = (formId) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch form data on mount
  useEffect(() => {
    const loadFormData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let data;
        
        if (formId === 'new') {
          // Create new empty form
          data = createEmptyForm();
        } else {
          // Fetch existing form
          data = await fetchFormById(formId);
        }
        
        setFormData(data);
      } catch (err) {
        console.error("Error loading form:", err);
        setError("Failed to load form. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFormData();
  }, [formId]);
  
  // Update form field
  const updateFormField = (field, value) => {
    if (!formData) return;
    
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  // Add new block
  const addBlock = (type, index) => {
    if (!formData) return;
    
    // Create new block object
    const newBlock = {
      id: `block_${uuidv4()}`,
      type,
      question: 'Untitled Question',
      required: false,
      // Add default values based on block type
      ...getDefaultBlockProps(type)
    };
    
    setFormData(prevData => {
      const newBlocks = [...prevData.blocks];
      
      if (typeof index === 'number') {
        // Insert at specific index
        newBlocks.splice(index, 0, newBlock);
      } else {
        // Add to the end
        newBlocks.push(newBlock);
      }
      
      return {
        ...prevData,
        blocks: newBlocks
      };
    });
    
    return newBlock.id; // Return new block ID
  };
  
  // Update block
  const updateBlock = (blockId, updates) => {
    if (!formData) return;
    
    setFormData(prevData => {
      const newBlocks = prevData.blocks.map(block => {
        if (block.id === blockId) {
          return {
            ...block,
            ...updates
          };
        }
        return block;
      });
      
      return {
        ...prevData,
        blocks: newBlocks
      };
    });
  };
  
  // Remove block
  const removeBlock = (blockId) => {
    if (!formData) return;
    
    setFormData(prevData => ({
      ...prevData,
      blocks: prevData.blocks.filter(block => block.id !== blockId)
    }));
  };
  
  // Move block (change position)
  const moveBlock = (sourceIndex, destinationIndex) => {
    if (!formData) return;
    
    setFormData(prevData => {
      const newBlocks = [...prevData.blocks];
      const [movedBlock] = newBlocks.splice(sourceIndex, 1);
      newBlocks.splice(destinationIndex, 0, movedBlock);
      
      return {
        ...prevData,
        blocks: newBlocks
      };
    });
  };
  
  // Duplicate block
  const duplicateBlock = (blockId) => {
    if (!formData) return;
    
    const blockToDuplicate = formData.blocks.find(block => block.id === blockId);
    if (!blockToDuplicate) return;
    
    // Create duplicate with new ID
    const duplicatedBlock = {
      ...blockToDuplicate,
      id: `block_${uuidv4()}`,
      question: `${blockToDuplicate.question} (Copy)`
    };
    
    // Find index of the block to duplicate
    const blockIndex = formData.blocks.findIndex(block => block.id === blockId);
    
    setFormData(prevData => {
      const newBlocks = [...prevData.blocks];
      // Insert duplicated block after the original
      newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
      
      return {
        ...prevData,
        blocks: newBlocks
      };
    });
    
    return duplicatedBlock.id; // Return new block ID
  };
  
  return {
    formData,
    setFormData,
    isLoading,
    error,
    updateFormField,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    duplicateBlock
  };
};

// Helper function to get default properties for a new block based on type
const getDefaultBlockProps = (type) => {
  switch (type) {
    case 'short_text':
    case 'long_text':
    case 'email':
    case 'phone':
    case 'number':
    case 'url':
      return {
        placeholder: 'Your answer here...'
      };
      
    case 'single_choice':
    case 'multiple_choice':
    case 'dropdown':
      return {
        options: [
          { label: 'Option 1', value: 'option_1' },
          { label: 'Option 2', value: 'option_2' },
          { label: 'Option 3', value: 'option_3' }
        ]
      };
      
    case 'rating':
      return {
        maxRating: 5,
        showLabels: true,
        startLabel: 'Poor',
        endLabel: 'Excellent'
      };
      
    case 'scale':
      return {
        minValue: 1,
        maxValue: 10,
        showLabels: true,
        startLabel: 'Not likely',
        endLabel: 'Very likely'
      };
      
    case 'date':
      return {
        includeTime: false,
        dateFormat: 'MM/DD/YYYY'
      };
      
    case 'file_upload':
      return {
        maxFileSize: 10, // MB
        allowedFileTypes: ['pdf', 'jpg', 'png', 'doc', 'docx'],
        maxFiles: 1
      };
      
    case 'payment':
      return {
        currency: 'USD',
        amount: 0,
        isCustomAmount: false,
        paymentDescription: 'Payment'
      };
      
    case 'statement':
      return {
        content: 'Add your statement text here',
        showIcon: false,
        icon: 'info'
      };
      
    default:
      return {};
  }
};

export default useFormData;
