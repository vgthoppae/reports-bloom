import React from 'react';
import Color from './Color';

export default function ColorList({ colors = [], selectedStars = 0, onRemoveColor = (f) => f, onRateColor = (f) => f }) {
  if (!colors.length) return <div> No Colors Listed </div>;
  return (
    <div>
      {colors.map((color) => {
        const allkeys = {...color, selectedStars}
        return <Color key={color.id} {...allkeys} onRemove={onRemoveColor} onRateColor={onRateColor} />
})}
    </div>
  );
}
