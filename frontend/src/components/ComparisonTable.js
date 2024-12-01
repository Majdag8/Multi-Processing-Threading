import React from 'react';
// import './ComparisonTable.css';

function ComparisonTable({ data }) {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Multi-threading</th>
          <th>Multi-processing</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((metric, index) => (
          <tr key={index}>
            <td>{metric}</td>
            <td>{data[metric].multi_threading}</td>
            <td>{data[metric].multi_processing}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComparisonTable;
