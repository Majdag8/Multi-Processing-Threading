import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import PerformanceCard from '../components/PerformanceSummaryCard';
import '../styles/performance.css';

function PerformanceComparison() {
  const [performanceData, setPerformanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/performance')
      .then(response => setPerformanceData(response.data))
      .catch(error => {
        console.error('Error fetching performance data:', error);
        setError('Failed to load performance data.');
      });
  }, []);

  return (
    <div className="performance-comparison">
      <header>
        <h1>Performance Comparison</h1>
        <p className="description">
          Compare key metrics for multi-threading and multi-processing to evaluate their performance differences.
        </p>
      </header>
      <div className="cards-container">
        {error ? (
          <p className="error-text">{error}</p>
        ) : performanceData ? (
          <>
            <PerformanceCard title="Multi-threading" data={performanceData.threading} />
            <PerformanceCard title="Multi-processing" data={performanceData.processing} />
          </>
        ) : (
          <p className="loading-text">Loading performance data...</p>
        )}
      </div>
    </div>
  );
}

export default PerformanceComparison;
