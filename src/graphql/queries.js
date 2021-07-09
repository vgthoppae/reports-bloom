export const getReport = `
  query getReport($id: ID!) {
    getReport(id: $id) {
      id,
      details
    }
  }
`;

export const getReportItem = `
  query getReportItem($pk: ID!, $sk: String!) {
    getReportItem(pk: $pk, sk: $sk) {
      pk,
      sk,
      details {
        key
        desc
      }
    }
  }
`;