/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: testSub
// ====================================================

export interface testSub_postAdded {
  __typename: "Post";
  author: string | null;
  comment: string | null;
}

export interface testSub {
  postAdded: testSub_postAdded | null;
}
