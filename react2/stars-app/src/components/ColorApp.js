import React, { useEffect, useState } from 'react';
import ColorList from './ColorList.js';
import AddColorForm from './AddColorForm';

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener('keydown', forceRender);
    return () => window.removeEventListener('keydown', forceRender);
  }, []);
};

export default function ColorApp() {
  useAnyKeyToRender();

  useEffect(() => {
    console.log('fresh render');
  });

  return (
    <div style={{ padding: '10px' }}>
      <AddColorForm />
      <ColorList />
    </div>
  );
}
