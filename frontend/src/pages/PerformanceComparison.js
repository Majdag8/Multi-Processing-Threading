import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import PerformanceCard from '../components/PerformanceSummaryCard';
import '../styles/performance.css';

function PerformanceComparison() {
  const [performanceData, setPerformanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/performance')
      .then(response => {
        console.log('API Response:', response.data);
        setPerformanceData(response.data || {});
      })
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
        ) : performanceData && Object.keys(performanceData).length === 0 ? (
          <p className="error-text">No performance data available.</p>
        ) : performanceData ? (
          <>
            <PerformanceCard title="Multi-threading" data={performanceData.threading_result} />
            <PerformanceCard title="Multi-processing" data={performanceData.multiprocessing_result} />
          </>
        ) : (
          <div className="loading-text">
            <div className="loading-circle"></div>
            Loading performance data...
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformanceComparison;
