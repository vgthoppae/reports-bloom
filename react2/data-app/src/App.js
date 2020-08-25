import React, { useEffect, useState } from 'react';

const login = "vgthoppae"

export default function App() {

  
  useEffect(() => {
    console.log("use effect")
    fetch(`https://api.github.com/users/vgthoppae`)
      .then(data=>data.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err))    
  }, []);

  return (
    <h1>Retrieving from git hub...</h1>
  );
}
