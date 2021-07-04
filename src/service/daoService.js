import { putReport } from '../graphql/mutations';
import Amplify, { API } from 'aws-amplify';

export async function putReportEntry(entry) {
  try {
    await API.graphql({
      query: putReport,
      variables: { input: entry },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }  
}