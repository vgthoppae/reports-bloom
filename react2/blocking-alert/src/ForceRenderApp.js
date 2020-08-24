import React, { useState, useEffect } from 'react';

const words = ['sick', 'powder', 'day'];

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener('keydown', forceRender);
    return () => window.removeEventListener('keydown', forceRender);
  }, []);
};

export default function ForceRenderApp() {
  useAnyKeyToRender();

  useEffect(() => {
    console.log('Fresh render');
  }, [words]);

  return <h1>Open the Console</h1>;
}
