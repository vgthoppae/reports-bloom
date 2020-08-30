import React, { useEffect, useState } from 'react';

const saveJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadJSON = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

function GitHubUser({ login }) {
  const [data, setData] = useState(loadJSON(`user:${login}`));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('login useEffect being called...');
    if (data) {
      setLoading(false);
      return;
    }
    if (data && data.login === login) return;

    console.log('about to call fetch');

    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(({ name, avatar_url, location }) => {
        const result = { name, avatar_url, location };
        setData(result);
        saveJSON(`user:${login}`, result);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [login]);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  if (data)
    return (
      <>
        <img src={data.avatar_url} style={{ width: 200 }} />
        <h1>{data.name}</h1>
        <h2>{data.location}</h2>
      </>
    );

  return null;
}

export default function App() {
  return <GitHubUser login="vgthoppae" />;
}
