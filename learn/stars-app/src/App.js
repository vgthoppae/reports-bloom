import React from 'react';
import logo from './logo.svg';
import './App.css';

import StarRating from './components/StarRating.js';

function App() {
  return (
    <StarRating
      style={{ backgroundColor: 'lightBlue' }}
      onDoubleClick={(e) => alert('double click')}
    />
  );
}

export default App;
