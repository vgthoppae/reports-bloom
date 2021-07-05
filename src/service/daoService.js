import { putReport, putReportItem } from '../graphql/mutations';
import { getReport, getReportItem } from '../graphql/queries';
import Amplify, { API } from 'aws-amplify';

export async function putReportEntry(entry) {
  try {
    await API.graphql({
      query: putReport,
      variables: { id: entry.id, details: entry.details },
      authMode: 'API_KEY',
    });
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }  
}

export async function putReportItemEntry(arg) {
  try {
    await API.graphql({
      query: putReportItem,
      variables: { pk: arg.pk, sk: arg.sk, entry: arg.entry },
      authMode: 'API_KEY',
    });
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }  
}

export async function getReportItemEntry(arg) {
  try {
    const ret = await API.graphql({
      query: getReportItem,
      variables: { pk: arg.pk, sk: arg.sk },
      authMode: 'API_KEY',
    });
    console.log(ret)
    console.log('entry retrieved');
  } catch (err) {
    console.log('error reading status entry:', err);
  }  
}

export async function getReportEntry(entry) {
  try {
    const result = await API.graphql({
      query: getReport,
      variables: { id: entry.pk },
      authMode: 'API_KEY',
    });
    console.log(result);
    console.log('entry retrieved');
  } catch (err) {
    console.log('error reading status entry:', err);
  }  
}