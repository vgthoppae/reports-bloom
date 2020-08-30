import React, { useState, useEffect, useMemo } from 'react';

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener('keydown', forceRender);
    return () => window.removeEventListener('keydown', forceRender);
  }, []);
};

function WordCount({ children }) {
  useAnyKeyToRender();

  const memo = useMemo(() => children.split(' '), [children]);

  useEffect(() => {
    console.log('Fresh render');
  }, [memo]);

  return (
    <>
      <p>{children}</p>
      <p>
        <strong>{memo.length}-words</strong>
      </p>
    </>
  );
}

export default function MemoizeApp() {
  return <WordCount>You are not going to believe this</WordCount>;
}
