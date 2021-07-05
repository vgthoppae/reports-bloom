export const putReport = `
  mutation putReport($id: ID!, $details: String) {
    putReport(id: $id, details: $details) {
      id,
      details
    }
  }
`;

export const putReportItem = `
  mutation putReportItem($pk: ID!, $sk: String!, $entry:[ReportDetailInput]!) {
    putReportItem(pk: $pk, sk: $sk, entry: $entry) {
      pk,
      sk,
      details {
        key
        desc
      }
    }
  }
`;

