import React from 'react';
// import './DetailCard.css';

function DetailCard({ data, title }) {
  return (
    <div className="detail-card">
      <h3>{title}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DetailCard;
