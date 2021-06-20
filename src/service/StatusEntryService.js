// import Amplify, { API } from 'aws-amplify';
// import { getReportEntryMvp, queryPkReportEntryMvp } from '../graphql/queries';
// import { createReportEntryMvp } from '../graphql/mutations';
import moment from 'moment';
import {getCurrentOrg, getCurrentUser} from './CommonUtils'
// import awsExports from '../aws-exports';
// Amplify.configure(awsExports);

const addMonthYearItemCollection= async (entry) => {
  // extract the month/year
  const period = entry.sk
  const parts = period.split("-")
  const monthYears = new Set();
  const org = getCurrentOrg();
  const user = await getCurrentUser();

  const startDate = moment(parts[0])
  const endDate = moment(parts[1])

  monthYears.add(`${startDate.month() + 1}/${startDate.year()}`)
  monthYears.add(`${endDate.month() + 1}/${endDate.year()}`)

  for (const item of monthYears) {
    const row = {
      pk: `org=${org}#user=${user.username}#myr=${item}`,
      sk: period
    }
    await addReportTableItem(row)
  }
}

export async function addReportTableItem(entry) {
  try {
    // await API.graphql({
    //   query: createReportEntryMvp,
    //   variables: { input: entry },
    //   authMode: 'AMAZON_COGNITO_USER_POOLS',
    // });
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }  
}

export async function addReportEntry(entry) {
  try {
    await addReportTableItem(entry);
    await addMonthYearItemCollection(entry)
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }
}

export async function getReportEntry(pk, sk) {
  // try {
  //   const entryData = await API.graphql({
  //     query: getReportEntryMvp,
  //     variables: { pk, sk},
  //     authMode: 'AMAZON_COGNITO_USER_POOLS',
  //   });
  //   console.log(entryData);
  //   if (entryData && entryData.data.getReportEntryMVP) {
  //     return JSON.parse(entryData.data.getReportEntryMVP.description);
  //   }
  // } catch (err) {
  //   debugger;
  //   console.log('error fetching status entries', err);
  // }
}

export async function getReportEntryPeriods(pk) {
  // try {
  //   const entryData = await API.graphql({
  //     query: queryPkReportEntryMvp,
  //     variables: { pk},
  //     authMode: 'AMAZON_COGNITO_USER_POOLS',
  //   });
  //   console.log(entryData);
  //   const periods= []
  //   if (entryData && entryData.data.queryPKReportEntryMVP) {
  //     entryData.data.queryPKReportEntryMVP.forEach(({pk, sk}, index) => {
  //       periods.push({pk, sk})
  //     })
  //     return periods;
  //   }
  // } catch (err) {
  //   debugger;
  //   console.log('error fetching status entries', err);
  // }
}

export async function addStatusEntry(entry) {
  try {
    // await API.graphql({
    //   query: createStatusEntry,
    //   variables: { input: entry },
    //   authMode: 'AMAZON_COGNITO_USER_POOLS',
    // });
    console.log('entry added');
  } catch (err) {
    console.log('error creating status entry:', err);
  }
}

export async function fetchStatusEntry(userId, period) {
  try {
    // const entryData = await API.graphql({
    //   query: getStatusEntry,
    //   variables: { period, userId },
    //   authMode: 'AMAZON_COGNITO_USER_POOLS',
    // });
    // console.log(entryData);
    // const result = entryData.data.getStatusEntry;
    // console.log(result);
    // return result;
    return undefined;
  } catch (err) {
    debugger;
    console.log('error fetching status entries', err);
  }
}
