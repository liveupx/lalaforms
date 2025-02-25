// src/components/form-builder/AnalyticsCharts.jsx
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const AnalyticsCharts = ({ analytics }) => {
  const [timeRange, setTimeRange] = useState('30days');
  
  // If no analytics data is available
  if (!analytics) {
    return (
      <div className="analytics-placeholder">
        <div className="placeholder-icon">📊</div>
        <h3>No analytics data available</h3>
        <p>Start collecting form submissions to see analytics data here.</p>
      </div>
    );
  }
  
  // Process time range filter
  const getDailyData = () => {
    const dailyData = [...analytics.daily_data];
    
    if (timeRange === '7days') {
      return dailyData.slice(0, 7);
    }
    
    if (timeRange === '14days') {
      return dailyData.slice(0, 14);
    }
    
    // Default to 30 days
    return dailyData;
  };
  
  const filteredDailyData = getDailyData().reverse(); // Reverse to show chronological order
  
  // Colors for charts
  const primaryColor = '#6366f1';
  const secondaryColor = '#f43f5e';
  const tertiaryColor = '#10b981';
  const neutralColor = '#94a3b8';
  
  // Custom colors for pie chart
  const pieColors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b'];
  
  // Format time duration
  const formatTimeDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds} sec`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (remainingSeconds === 0) {
      return `${minutes} min`;
    }
    
    return `${minutes} min ${remainingSeconds} sec`;
  };
  
  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Form Analytics</h2>
        <div className="time-range-selector">
          <label>Time range:</label>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="14days">Last 14 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>
      
      <div className="summary-metrics">
        <div className="metric-card">
          <div className="metric-icon views">👁️</div>
          <div className="metric-value">{analytics.summary.total_views}</div>
          <div className="metric-label">Total Views</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon submissions">📝</div>
          <div className="metric-value">{analytics.summary.total_submissions}</div>
          <div className="metric-label">Total Submissions</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon conversion">📈</div>
          <div className="metric-value">{analytics.summary.conversion_rate}%</div>
          <div className="metric-label">Conversion Rate</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon time">⏱️</div>
          <div className="metric-value">{formatTimeDuration(analytics.summary.avg_completion_time)}</div>
          <div className="metric-label">Avg. Completion Time</div>
        </div>
      </div>
      
      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Views & Submissions Over Time</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredDailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'views' ? 'Views' : 'Submissions']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke={primaryColor} 
                  name="Views" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke={secondaryColor} 
                  name="Submissions" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Conversion Rate Over Time</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredDailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke={tertiaryColor} 
                  name="Conversion Rate" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Field Completion Rates</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={Object.entries(analytics.field_analytics.completion_rates).map(([field, rate]) => ({
                  field: field.replace('_field', ''),
                  rate
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="field" />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                <Legend />
                <Bar dataKey="rate" fill={primaryColor} name="Completion Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Traffic Sources</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.source_analytics}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="source"
                  label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
                >
                  {analytics.source_analytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [value, props.payload.source]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Device Breakdown</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics.device_analytics}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={secondaryColor} name="Submissions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Dropoff Points</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics.field_analytics.dropoff_points}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="field_id" />
                <Tooltip formatter={(value) => [`${value}%`, 'Dropoff Rate']} />
                <Legend />
                <Bar dataKey="dropoff_rate" fill={neutralColor} name="Dropoff Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
