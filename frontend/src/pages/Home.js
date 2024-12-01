import React from 'react';
import '../styles/home.css';

function Home() {
  return (

      <div className="home">
        <p className="welcome_parag">
          Discover the power of multi-threading and multi-processing with our
          intuitive analysis platform.
        </p>

        <section className="description-section">
          <div className="description-card">
            <h3 className="description-title">What is Multi-threading?</h3>
            <p className="description-text">
              Multithreading allows a program to execute multiple tasks 
              concurrently using separate threads within a single process.
              This can improve performance by maximizing CPU usage.
            </p>
            <ul className="benefits-list">
              <li>Efficient resource sharing</li>
              <li>Reduced idle time</li>
              <li>Faster execution for lightweight tasks</li>
            </ul>
          </div>

          <div className="description-card">
            <h3 className="description-title">What is Multi-processing?</h3>
            <p className="description-text">
              Multiprocessing uses multiple processors or CPU cores to execute
              tasks simultaneously. It excels at handling computationally
              intensive workloads by dividing them among multiple processes.
            </p>
            <ul className="benefits-list">
              <li>Handles CPU-intensive tasks efficiently</li>
              <li>True parallel execution</li>
              <li>Prevents bottlenecks in heavy workloads</li>
            </ul>
          </div>
        </section>
      </div>

  );
}

export default Home;
