import React from 'react';
import '../styles/footer.css'; 
function footer() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="footer">
        <p>&copy; {currentYear} Performance Analyzer. Do not copy us</p>
      </footer>
    );
  }
  export default footer;