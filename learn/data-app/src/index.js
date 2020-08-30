// import React from 'react';

// const callGitHub = () => {
// fetch(`https://api.github.com/users/vgthoppae`)
// .then(data=>data.json())
// .then(data=>console.log(data))
// .catch(err=>console.log(err))
// console.log("hello")
// }

// callGitHub();

import React from 'react';
import ReactDOM from 'react-dom';
import MountApp from './MountApp';
import VirtualListApp from './VirtualListApp';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <VirtualListApp />
  </React.StrictMode>,
  rootElement
);
