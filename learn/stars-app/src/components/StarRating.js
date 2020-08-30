import React, { useState } from 'react';
import Star from './Star';

const createArray = (length) => [...Array(length)];

export default function StarRating({ totalStars = 5, style = {}, ...props }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div style={{ padding: '5px', ...style }} {...props}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars}
      </p>
    </div>
  );
}
