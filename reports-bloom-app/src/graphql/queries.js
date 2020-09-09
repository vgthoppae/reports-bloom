/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStatusEntry = /* GraphQL */ `
  query GetStatusEntry($period: String!, $userId: String!) {
    getStatusEntry(period: $period, userId: $userId) {
      period
      userId
      description
      createdAt
      updatedAt
    }
  }
`;
export const listStatusEntrys = /* GraphQL */ `
  query ListStatusEntrys(
    $period: String
    $userId: ModelStringKeyConditionInput
    $filter: ModelStatusEntryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStatusEntrys(
      period: $period
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        period
        userId
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
