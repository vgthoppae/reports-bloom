export const putReport = /* GraphQL */ `
  mutation putReport($id: ID!, $details: String) {
    putReport(id: $id, details: $details) {
      id,
      details
    }
  }
`;

// export const putReport = /* GraphQL */ `
//   mutation putReport {
//     putReport(id: "sam", details: "foo") {
//       id
//     }
//   }
// `;