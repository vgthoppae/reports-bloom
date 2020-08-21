import React, { useState } from 'react';
import colorData from '../data/color-data.json';
import ColorList from './ColorList.js';

function ColorApp() {
  const [colors, setColors] = useState(colorData);

  return (
    <div style={{ padding: '10px' }}>
      <ColorList
        colors={colors}
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
      />
    </div>
  );
}

export default ColorApp;
