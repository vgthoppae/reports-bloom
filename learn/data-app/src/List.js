import React from 'react';

export default function List({ data = [], renderItem, renderEmpty }) {
  if (!data) return renderEmpty;
  return (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
