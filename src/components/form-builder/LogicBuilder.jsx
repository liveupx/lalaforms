// src/components/form-builder/LogicBuilder.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiPlusCircle, FiTrash2, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const LogicBuilder = ({ form, onUpdateForm, onClose }) => {
  const [expandedRule, setExpandedRule] = useState(null);

  // Initialize logic rules if they don't exist
  const logicRules = form.logicRules || [];

  // Find blocks that can trigger logic
  const triggerBlocks = form.blocks.filter(block => 
    ['select', 'radio', 'checkbox', 'text', 'number'].includes(block.type)
  );

  // Find blocks that can be targets of logic
  const targetBlocks = form.blocks.filter(block => block.id);

  const addNewRule = () => {
    const newRule = {
      id: `rule_${Date.now()}`,
      name: `Rule ${logicRules.length + 1}`,
      conditions: [{
        blockId: triggerBlocks.length > 0 ? triggerBlocks[0].id : '',
        operator: 'equals',
        value: ''
      }],
      actions: [{
        type: 'show',
        blockId: targetBlocks.length > 0 ? targetBlocks[0].id : ''
      }]
    };

    onUpdateForm({
      ...form,
      logicRules: [...logicRules, newRule]
    });
    
    setExpandedRule(newRule.id);
  };

  const updateRule = (updatedRule) => {
    onUpdateForm({
      ...form,
      logicRules: logicRules.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      )
    });
  };

  const deleteRule = (ruleId) => {
    onUpdateForm({
      ...form,
      logicRules: logicRules.filter(rule => rule.id !== ruleId)
    });
    
    if (expandedRule === ruleId) {
      setExpandedRule(null);
    }
  };

  const addCondition = (rule) => {
    const updatedRule = {
      ...rule,
      conditions: [...rule.conditions, {
        blockId: triggerBlocks.length > 0 ? triggerBlocks[0].id : '',
        operator: 'equals',
        value: ''
      }]
    };
    updateRule(updatedRule);
  };

  const updateCondition = (rule, index, field, value) => {
    const updatedConditions = [...rule.conditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      [field]: value
    };
    
    updateRule({
      ...rule,
      conditions: updatedConditions
    });
  };

  const removeCondition = (rule, index) => {
    const updatedConditions = [...rule.conditions];
    updatedConditions.splice(index, 1);
    
    updateRule({
      ...rule,
      conditions: updatedConditions
    });
  };

  const addAction = (rule) => {
    const updatedRule = {
      ...rule,
      actions: [...rule.actions, {
        type: 'show',
        blockId: targetBlocks.length > 0 ? targetBlocks[0].id : ''
      }]
    };
    updateRule(updatedRule);
  };

  const updateAction = (rule, index, field, value) => {
    const updatedActions = [...rule.actions];
    updatedActions[index] = {
      ...updatedActions[index],
      [field]: value
    };
    
    updateRule({
      ...rule,
      actions: updatedActions
    });
  };

  const removeAction = (rule, index) => {
    const updatedActions = [...rule.actions];
    updatedActions.splice(index, 1);
    
    updateRule({
      ...rule,
      actions: updatedActions
    });
  };

  const renderCondition = (rule, condition, index) => {
    const block = form.blocks.find(b => b.id === condition.blockId);
    const blockHasOptions = block && ['select', 'radio', 'checkbox'].includes(block.type);
    
    return (
      <div key={index} className="p-3 bg-gray-50 rounded-md mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Condition {index + 1}</span>
          {rule.conditions.length > 1 && (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeCondition(rule, index)}
            >
              <FiTrash2 size={16} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <select
            value={condition.blockId}
            onChange={(e) => updateCondition(rule, index, 'blockId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Select a field</option>
            {triggerBlocks.map(block => (
              <option key={block.id} value={block.id}>
                {block.settings.label || `Field ${block.id}`}
              </option>
            ))}
          </select>
          
          <select
            value={condition.operator}
            onChange={(e) => updateCondition(rule, index, 'operator', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="equals">Equals</option>
            <option value="not_equals">Does not equal</option>
            <option value="contains">Contains</option>
            <option value="not_contains">Does not contain</option>
            <option value="starts_with">Starts with</option>
            <option value="ends_with">Ends with</option>
            {['number'].includes(block?.type) && (
              <>
                <option value="greater_than">Greater than</option>
                <option value="less_than">Less than</option>
              </>
            )}
            <option value="is_empty">Is empty</option>
            <option value="is_not_empty">Is not empty</option>
          </select>
          
          {!['is_empty', 'is_not_empty'].includes(condition.operator) && (
            blockHasOptions ? (
              <select
                value={condition.value}
                onChange={(e) => updateCondition(rule, index, 'value', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select an option</option>
                {block?.settings?.options?.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={condition.value}
                onChange={(e) => updateCondition(rule, index, 'value', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Enter value"
              />
            )
          )}
        </div>
      </div>
    );
  };

  const renderAction = (rule, action, index) => {
    return (
      <div key={index} className="p-3 bg-gray-50 rounded-md mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Action {index + 1}</span>
          {rule.actions.length > 1 && (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeAction(rule, index)}
            >
              <FiTrash2 size={16} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <select
            value={action.type}
            onChange={(e) => updateAction(rule, index, 'type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="show">Show</option>
            <option value="hide">Hide</option>
            <option value="require">Make required</option>
            <option value="unrequire">Make optional</option>
          </select>
          
          <select
            value={action.blockId}
            onChange={(e) => updateAction(rule, index, 'blockId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Select a field</option>
            {targetBlocks.map(block => (
              <option key={block.id} value={block.id}>
                {block.settings.label || `Field ${block.id}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Form Logic</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
      </div>
      
      {logicRules.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No logic rules configured yet</p>
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={addNewRule}
          >
            <FiPlusCircle className="mr-2" />
            Add First Rule
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <button
              className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
              onClick={addNewRule}
            >
              <FiPlusCircle className="mr-1" size={14} />
              Add Rule
            </button>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-220px)]">
            {logicRules.map(rule => (
              <div key={rule.id} className="border border-gray-200 rounded-md">
                <div
                  className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
                >
                  <div className="font-medium">{rule.name}</div>
                  <div className="flex items-center">
                    <button
                      className="text-red-500 hover:text-red-700 mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRule(rule.id);
                      }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                    {expandedRule === rule.id ? (
                      <FiChevronUp size={18} />
                    ) : (
                      <FiChevronDown size={18} />
                    )}
                  </div>
                </div>
                
                {expandedRule === rule.id && (
                  <div className="p-3 border-t border-gray-200">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rule Name
                      </label>
                      <input
                        type="text"
                        value={rule.name}
                        onChange={(e) => updateRule({ ...rule, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-semibold">If...</h4>
                      </div>
                      {rule.conditions.map((condition, index) => 
                        renderCondition(rule, condition, index)
                      )}
                      <button
                        className="text-blue-500 hover:text-blue-700 text-sm inline-flex items-center"
                        onClick={() => addCondition(rule)}
                      >
                        <FiPlusCircle className="mr-1" size={14} />
                        Add Condition
                      </button>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-semibold">Then...</h4>
                      </div>
                      {rule.actions.map((action, index) => 
                        renderAction(rule, action, index)
                      )}
                      <button
                        className="text-blue-500 hover:text-blue-700 text-sm inline-flex items-center"
                        onClick={() => addAction(rule)}
                      >
                        <FiPlusCircle className="mr-1" size={14} />
                        Add Action
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

LogicBuilder.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blocks: PropTypes.array.isRequired,
    logicRules: PropTypes.array
  }).isRequired,
  onUpdateForm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LogicBuilder;