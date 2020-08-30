import React, { useState, useEffect } from 'react';

export default function PhraseApp() {
  const [val, set] = useState('');
  const [phrase, setPhrase] = useState('Example phrase');

  const createPhrase = () => {
    setPhrase(val);
    set('');
  };

  useEffect(() => {
    console.log('Initial render just completed');
  }, []);

  useEffect(() => {
    console.log(`typing "${val}"`);
  }, [val]);

  useEffect(() => {
    console.log(`saved phrase: "${phrase}"`);
  }, [phrase]);

  return (
    <>
      <label>Favorite Phrase</label>
      <input
        type="text"
        val="val"
        placeholder={phrase}
        onChange={(e) => set(e.target.value)}
      />
      <button onClick={createPhrase}>Send</button>
    </>
  );
}
