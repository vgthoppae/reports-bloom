import React from 'react';
import ColorList from './ColorList.js';
import AddColorForm from './AddColorForm';

export default function ColorApp() {
  return (
    <div style={{ padding: '10px' }}>
      <AddColorForm />
      <ColorList />
    </div>
  );
}
