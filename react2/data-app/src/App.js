import React, { useEffect, useState } from 'react';

const saveJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const loadJSON = (key) => {
  console.log(JSON.parse(localStorage.getItem(key)))
  return JSON.parse(localStorage.getItem(key))
}

function GitHubUser({login}) {
  const [data, setData] = useState(loadJSON(`user:${login}`))

  useEffect(() => {
    if (!data) return

    if (data.login === login) return

    const {name, avatar_url, location} = data

    saveJSON(`user:${login}`, {name, login, avatar_url, location})
  }, [data])

  useEffect(()=> {
    if (data) return

    if (data && data.login === login) return

    fetch(`https://api.github.com/users/${login}`)
    .then(response=>response.json())
    .then((json) => {
      setData(json);
      console.log(json);
    })
    .catch(console.log)
  }, [login])

  if (data)
    return <pre>{JSON.stringify(data, null, 2)}</pre>

  return null
}

export default function App() {

  return (
    <GitHubUser login="moonhighway" />
  );
}
