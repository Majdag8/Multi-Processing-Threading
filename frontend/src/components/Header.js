import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header-h1">Performance Analyzer</h1>
      <nav className="header-nav">
        <Link to="/" className="nav-link home-link">Home</Link>
        <Link to="/comparison" className="nav-link comparison-link">Performance Comparison</Link>
        <Link to="/details" className="nav-link details-link">Details</Link>
      </nav>
    </header>
  );
}

export default Header;
