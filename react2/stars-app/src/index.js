import React from 'react';
import { render } from 'react-dom';
import './index.css';
import ColorApp from './components/ColorApp';
// import * as serviceWorker from './serviceWorker';
import ColorProvider from './components/ColorProvider';

render(
  <ColorProvider>
    <ColorApp />
  </ColorProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
