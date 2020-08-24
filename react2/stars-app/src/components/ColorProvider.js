import React, { useState, createContext, useContext, useEffect } from 'react';
import colorData from '../data/color-data.json';
import { v4 } from 'uuid';

const ColorContext = createContext();

export const useColors = () => useContext(ColorContext);

export default function ColorProvider({ children }) {
  const [colors, setColors] = useState(colorData);

  const addColor = (title, color) => {
    setColors([
      ...colors,
      {
        id: v4(),
        title,
        color,
        rating: 0,
      },
    ]);
  };

  const rateColor = (id, rating) => {
    const newColors = colors.map((color) =>
      color.id === id ? { ...color, rating } : color
    );
    setColors(newColors);
  };

  const removeColor = (id) => {
    setColors(colors.filter((color) => color.id !== id));
  };

  useEffect(() => {
    const msg = colors.map(({ title, rating }) => `${title}-${rating}`);
    alert(msg.join('\n'));
  });

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
}
