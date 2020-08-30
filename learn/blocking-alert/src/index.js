import React from 'react';
import ReactDOM from 'react-dom';

import MemoizeApp from './MemoizeApp';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <MemoizeApp />
  </React.StrictMode>,
  rootElement
);
