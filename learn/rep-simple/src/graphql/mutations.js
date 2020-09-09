/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStatusEntry = /* GraphQL */ `
  mutation CreateStatusEntry(
    $input: CreateStatusEntryInput!
    $condition: ModelStatusEntryConditionInput
  ) {
    createStatusEntry(input: $input, condition: $condition) {
      period
      userId
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateStatusEntry = /* GraphQL */ `
  mutation UpdateStatusEntry(
    $input: UpdateStatusEntryInput!
    $condition: ModelStatusEntryConditionInput
  ) {
    updateStatusEntry(input: $input, condition: $condition) {
      period
      userId
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteStatusEntry = /* GraphQL */ `
  mutation DeleteStatusEntry(
    $input: DeleteStatusEntryInput!
    $condition: ModelStatusEntryConditionInput
  ) {
    deleteStatusEntry(input: $input, condition: $condition) {
      period
      userId
      description
      createdAt
      updatedAt
    }
  }
`;
