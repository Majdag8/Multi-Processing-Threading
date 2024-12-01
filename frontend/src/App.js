import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PerformanceComparison from './pages/PerformanceComparison';
import Details from './pages/Details';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/app.css';
import './styles/animations.css';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison" element={<PerformanceComparison />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
