/* src/App.js */
import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createStatusEntry } from './graphql/mutations';
import { listStatusEntrys } from './graphql/queries';
import {
  withAuthenticator,
  AmplifySignOut,
  theme,
} from '@aws-amplify/ui-react';
// import { Bootstrap } from 'a-theme-react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const initialState = { period: '', userId: '', description: '' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [statusEntries, setStatusEntries] = useState([]);

  useEffect(() => {
    fetchStatusEntries();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchStatusEntries() {
    try {
      const entryData = await API.graphql(graphqlOperation(listStatusEntrys));
      const entries = entryData.data.listStatusEntrys.items;
      setStatusEntries(entries);
    } catch (err) {
      console.log('error fetching status entries');
    }
  }

  async function addStatusEntry() {
    try {
      if (!formState.period || !formState.userId) return;
      const entry = { ...formState };
      setStatusEntries([...statusEntries, entry]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createStatusEntry, { input: entry }));
    } catch (err) {
      console.log('error creating status entry:', err);
    }
  }

  return (
    <div style={styles.container}>
      <AmplifySignOut />
      <h2>Amplify Status Entries</h2>
      <input
        onChange={(event) => setInput('period', event.target.value)}
        style={styles.input}
        value={formState.period}
        placeholder="period"
      />
      <input
        onChange={(event) => setInput('userId', event.target.value)}
        style={styles.input}
        value={formState.userId}
        placeholder="userId"
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addStatusEntry}>
        Create Status Entry
      </button>
      {statusEntries.map((entry, index) => (
        <div key={index} style={styles.todo}>
          <p style={styles.todoName}>{entry.period}</p>
          <p style={styles.todoName}>{entry.index}</p>
          <p style={styles.todoDescription}>{entry.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
};

// const theme = {
//   ...AmplifyTheme,
// };

export default withAuthenticator(App, theme);
