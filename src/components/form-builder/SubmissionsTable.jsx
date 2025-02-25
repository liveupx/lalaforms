// src/components/form-builder/SubmissionsTable.jsx
import React, { useState } from 'react';
import { formatDateTime } from '../../utils/dateUtils';

const SubmissionsTable = ({ submissions, formId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('submittedAt');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Get all field keys from submissions 
  // (excluding metadata fields like id, submittedAt, etc.)
  const getFormFields = () => {
    if (!submissions.length) return [];
    
    // Combine all keys from all submissions
    const allFields = submissions.reduce((fields, submission) => {
      Object.keys(submission.data || {}).forEach(key => {
        if (!fields.includes(key)) {
          fields.push(key);
        }
      });
      return fields;
    }, []);
    
    return allFields;
  };
  
  const formFields = getFormFields();
  
  // Filter submissions based on search query
  const filteredSubmissions = submissions.filter(submission => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    
    // Search in all submission data fields
    return (
      Object.values(submission.data || {}).some(value => 
        String(value).toLowerCase().includes(searchLower)
      ) ||
      submission.id.toLowerCase().includes(searchLower) ||
      formatDateTime(submission.submittedAt).toLowerCase().includes(searchLower)
    );
  });
  
  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    let valueA, valueB;
    
    if (sortField === 'submittedAt') {
      valueA = new Date(a.submittedAt).getTime();
      valueB = new Date(b.submittedAt).getTime();
    } else if (sortField === 'id') {
      valueA = a.id;
      valueB = b.id;
    } else {
      // Sort by a form field
      valueA = a.data?.[sortField] || '';
      valueB = b.data?.[sortField] || '';
    }
    
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
    }
    if (typeof valueB === 'string') {
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Paginate submissions
  const totalPages = Math.ceil(sortedSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubmissions = sortedSubmissions.slice(
    startIndex, 
    startIndex + itemsPerPage
  );
  
  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  // Handle view submission details
  const handleViewSubmission = (submissionId) => {
    // This would open a submission details modal or navigate to details page
    alert(`View submission ${submissionId}`);
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Get truncated text for display
  const getTruncatedText = (text, maxLength = 50) => {
    if (!text) return '';
    text = String(text);
    
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="submissions-table-container">
      <div className="submissions-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="search-input"
          />
        </div>
        
        <div className="items-per-page">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="submissions-table">
          <thead>
            <tr>
              <th 
                className="sortable"
                onClick={() => handleSort('id')}
              >
                ID {getSortIndicator('id')}
              </th>
              
              {formFields.slice(0, 3).map(field => (
                <th 
                  key={field}
                  className="sortable"
                  onClick={() => handleSort(field)}
                >
                  {field} {getSortIndicator(field)}
                </th>
              ))}
              
              <th 
                className="sortable"
                onClick={() => handleSort('submittedAt')}
              >
                Submitted At {getSortIndicator('submittedAt')}
              </th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubmissions.map(submission => (
              <tr key={submission.id}>
                <td>{submission.id}</td>
                
                {formFields.slice(0, 3).map(field => (
                  <td key={field}>
                    {getTruncatedText(submission.data?.[field] || '')}
                  </td>
                ))}
                
                <td>{formatDateTime(submission.submittedAt)}</td>
                
                <td>
                  <button 
                    className="btn-action"
                    onClick={() => handleViewSubmission(submission.id)}
                    title="View Details"
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
            
            {paginatedSubmissions.length === 0 && (
              <tr>
                <td colSpan={5 + formFields.slice(0, 3).length} className="no-results">
                  No submissions match your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo; Previous
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTable;
