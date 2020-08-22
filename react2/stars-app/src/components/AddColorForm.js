import React, { useState } from 'react';
import useInput from './hooks/useInput';
import { useColors } from './ColorProvider';

export default function AddColorForm() {
  // const [title, setTitle] = useState("")
  // const [color, setColor] = useState("#000000")

  const [titleProps, resetTitle] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');
  const { addColor } = useColors();

  const submit = (e) => {
    e.preventDefault();
    addColor(titleProps.value, colorProps.value);
    resetTitle('');
    resetColor('');
  };

  // return (
  //   <form onSubmit={submit}>
  //     <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="color title..." required/>
  //     <input type="text" value={color} onChange={event => setColor(event.target.value)} required/>
  //     <button>ADD</button>
  //   </form>
  // )

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        {...titleProps}
        placeholder="color title..."
        required
      />
      <input type="text" {...colorProps} required />
      <button>ADD</button>
    </form>
  );
}
