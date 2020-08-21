import React, { useState } from 'react';
import colorData from '../data/color-data.json';
import ColorList from './ColorList.js';
import { v4 } from "uuid";
import AddColorForm from './AddColorForm'

function ColorApp() {
  const [colors, setColors] = useState(colorData);
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <div style={{ padding: '10px' }}>
      <AddColorForm  onNewColor={(title, color)=> {
          const newColors = [...colors, 
            {
              id:v4(),
              title,
              color,
              rating: 0
            }]
          setColors(newColors)
        }}/>
      <ColorList
        colors={colors}
        selectedStars={selectedStars}
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
        onRateColor={(i) => {
          setSelectedStars(i+1)
        }}

      />
    </div>
  );
}

export default ColorApp;
