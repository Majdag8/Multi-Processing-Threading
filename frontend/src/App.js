import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For handling loading state

  const handleRunMultiprocessing = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get('http://127.0.0.1:5000/multiprocessing');
      const result = response.data.message;
  
      // Format the worker results and performance summary as arrays of strings
      let workerResultsMessage = ["Worker Process Results:"];
      result.worker_results.forEach((worker) => {
        workerResultsMessage.push(`Worker ${worker.worker_id} (PID: ${worker.pid}) calculated partial sum: ${worker.partial_sum}`);
      });
  
      let performanceSummaryMessage = [
        "\nPerformance Summary:",
        `Total Sum (Multi-processing): ${result.performance_summary.total_sum}`,
        `Execution Time: ${result.performance_summary.execution_time} seconds`,
        `CPU Usage Change: ${result.performance_summary.cpu_usage_change}%`,
        `Memory Usage Change: ${result.performance_summary.memory_usage_change} MB`
      ];
  
      // Combine the messages into one string with proper line breaks
      setMessage([...workerResultsMessage, ...performanceSummaryMessage].map((line, index) => <div key={index}>{line}</div>));
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error running multiprocessing evaluation');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRunMultithreading = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get('http://127.0.0.1:5000/multithreading');
      const result = response.data.message;
  
      // Format the thread results and performance summary as arrays of strings
      let threadResultsMessage = ["Thread Results:"];
      result.thread_results.forEach((thread) => {
        threadResultsMessage.push(`Thread ${thread.thread_number} (ID: ${thread.thread_id}) calculated partial sum: ${thread.partial_sum}`);
      });
  
      let performanceSummaryMessage = [
        "\nPerformance Summary:",
        `Total Sum (Multithreading): ${result.performance_summary.total_sum}`,
        `Execution Time: ${result.performance_summary.execution_time} seconds`,
        `CPU Usage Change: ${result.performance_summary.cpu_usage_change}%`,
        `Memory Usage Change: ${result.performance_summary.memory_usage_change} MB`
      ];
  
      // Combine the messages into one string with proper line breaks
      setMessage([...threadResultsMessage, ...performanceSummaryMessage].map((line, index) => <div key={index}>{line}</div>));
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error running multithreading evaluation');
    } finally {
      setLoading(false);
    }
  };

  const handleRunComparison = async () => {
    setLoading(true);
    setMessage('');
    try {
        const response = await axios.get('http://127.0.0.1:5000/performance');
        const result = response.data;

        // Format the performance results for multi-threading
        let threadingPerformanceMessage = [
            "Multi-threading Results:",
            `Execution Time: ${result.threading_result.execution_time} seconds`,
            `CPU Usage Change: ${result.threading_result.cpu_usage_change}%`,
            `Memory Usage Change: ${result.threading_result.memory_usage_change} MB`
        ];

        // Format the performance results for multi-processing
        let multiprocessingPerformanceMessage = [
            "Multi-processing Results:",
            `Execution Time: ${result.multiprocessing_result.execution_time} seconds`,
            `CPU Usage Change: ${result.multiprocessing_result.cpu_usage_change}%`,
            `Memory Usage Change: ${result.multiprocessing_result.memory_usage_change} MB`
        ];

        // Format the comparison summary as a table
        let comparisonSummaryMessage = (
            <div>
                <h3>Comparison Summary:</h3>
                <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Metric</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Multi-threading</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Multi-processing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Execution Time (s)</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {result.comparison_summary.execution_time.multi_threading}
                            </td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {result.comparison_summary.execution_time.multi_processing}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>CPU Usage (%)</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {result.comparison_summary.cpu_usage_change.multi_threading}
                            </td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {result.comparison_summary.cpu_usage_change.multi_processing}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Memory Change (MB)</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {result.comparison_summary.memory_usage_change.multi_threading}
                            </td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {result.comparison_summary.memory_usage_change.multi_processing}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

        // Combine all messages
        setMessage([ 
            ...threadingPerformanceMessage,
            ...multiprocessingPerformanceMessage,
            comparisonSummaryMessage
        ].map((line, index) => <div key={index}>{line}</div>));

    } catch (error) {
        console.error('Error fetching performance data:', error);
        setMessage('Error fetching performance data');
    } finally {
        setLoading(false);
    }
};

  

  return (
    <div className="App">
      <h1>Python Performance Evaluations</h1>
      <button onClick={handleRunMultiprocessing} disabled={loading}>
        {loading ? 'Running Multiprocessing...' : 'Run Multiprocessing'}
      </button>
      <button onClick={handleRunMultithreading} disabled={loading}>
        {loading ? 'Running Multithreading...' : 'Run Multithreading'}
      </button>
      <button onClick={handleRunComparison} disabled={loading}>
        {loading ? 'Running Comparison...' : 'Run Performance Comparison'}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
