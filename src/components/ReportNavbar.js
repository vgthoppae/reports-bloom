import React from 'react';
import { Link } from 'react-router-dom';

const ReportNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={{ hash: '#home' }}>Home</Link>
        </li>
        <li>
          <Link to={{ hash: '#reportStatus' }}>New Reports</Link>
        </li>
        <li>
          <Link to={{ hash: '#existingReports' }}>Existing Reports</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ReportNavbar;
