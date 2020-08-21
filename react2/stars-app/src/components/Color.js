import React from 'react';
import CompStarRating from './CompStarRating';
import { FaTrash } from 'react-icons/fa';

export default function Color({
  id,
  title,
  color,
  rating,
  onRemove = (f) => f,
}) {
  return (
    <section>
      <h1>{title}</h1>

      <button onClick={() => onRemove(id)}>
        <FaTrash />
      </button>

      <div style={{ height: 50, backgroundColor: color }} />
      <CompStarRating selectedStars={rating} />
    </section>
  );
}
