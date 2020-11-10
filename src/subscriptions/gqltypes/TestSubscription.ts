/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: TestSubscription
// ====================================================

export interface TestSubscription_postAdded {
  __typename: "Post";
  author: string | null;
  comment: string | null;
}

export interface TestSubscription {
  postAdded: TestSubscription_postAdded | null;
}
