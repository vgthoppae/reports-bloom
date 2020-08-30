import React from 'react';

const tahoe_peaks = [
  { name: 'Freel Peak', elevation: 10891 },
  { name: 'Monument Peak', elevation: 10067 },
  { name: 'Pyramid Peak', elevation: 9983 },
  { name: 'Mt. Tallac', elevation: 9735 },
];

function List({ data = [], renderItem, renderEmpty }) {
  if (!data) return renderEmpty;
  return (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default function MountApp() {
  return (
    <List
      data={tahoe_peaks}
      renderEmpty={<p>No data in the list</p>}
      renderItem={(item) => (
        <>
          {item.name} - {item.elevation.toLocaleString()}ft
        </>
      )}
    />
  );
}
