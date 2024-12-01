import React from 'react';
import '../styles/performanceSummaryCard.css';

function PerformanceCard({ title, data }) {
  return (
    <div className="performance-card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        <div className="metric">
          <h4>Execution Time</h4>
          <p>{data.execution_time.toFixed(4)} seconds</p>
        </div>
        <div className="metric">
          <h4>CPU Usage</h4>
          <p>{data.cpu_usage_change}%</p>
        </div>
        <div className="metric">
          <h4>Memory Change</h4>
          <p>{data.memory_usage_change.toFixed(2)} MB</p>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard;
