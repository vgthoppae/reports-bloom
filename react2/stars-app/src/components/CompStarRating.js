import React from 'react';
import Star from './Star';

const createArray = (length) => [...Array(length)];

export default function CompStarRating({ totalStars = 5, selectedStars = {} }) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star key={i} selected={selectedStars > i} />
      ))}
      <p>
        {selectedStars} of {totalStars}
      </p>
    </>
  );
}
