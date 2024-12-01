import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import DetailCard from '../components/DetailCard';
import '../styles/details.css';

function Details() {
  const [threadingData, setThreadingData] = useState(null);
  const [processingData, setProcessingData] = useState(null);

  useEffect(() => {
    axiosInstance.get('/multithreading')
      .then(response => setThreadingData(response.data.message))
      .catch(error => console.error(error));

    axiosInstance.get('/multiprocessing')
      .then(response => setProcessingData(response.data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="details">
      <h2>Performance Details</h2>
      <div className="cards-container">
        {threadingData && <DetailCard data={threadingData} title="Multi-threading" />}
        {processingData && <DetailCard data={processingData} title="Multi-processing" />}
      </div>
    </div>
  );
}

export default Details;
