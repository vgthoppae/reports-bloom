import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listStatusEntrys } from '../graphql/queries';
import { createStatusEntry } from '../graphql/mutations';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export async function fetchStatusEntries() {
  try {
    // const entryData = await API.graphql(graphqlOperation(listStatusEntrys));
    const entryData = await API.graphql({
      query: listStatusEntrys,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    const entries = entryData.data.listStatusEntrys.items;
    return entries;
  } catch (err) {
    console.log('error fetching status entries');
  }
}

export async function addStatusEntry(entry) {
  try {
    // await API.graphql(graphqlOperation(createStatusEntry, { input: entry }));
    await API.graphql({
      query: createStatusEntry,
      variables: { input: entry },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }
}
