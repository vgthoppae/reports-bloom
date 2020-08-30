import React from 'react';
import Star from './Star';

const createArray = (length) => [...Array(length)];

export default function CompStarRating({ totalStars = 5, selectedStars = 0, onRate = f => f }) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star key={i} selected={selectedStars > i} onSelect={() => onRate(i)}/>
      ))}
      <p>
        {selectedStars} of {totalStars}
      </p>
    </>
  );
}
