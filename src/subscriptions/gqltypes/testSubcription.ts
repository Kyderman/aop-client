/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: testSubcription
// ====================================================

export interface testSubcription_postAdded {
  __typename: "Post";
  author: string | null;
  comment: string | null;
}

export interface testSubcription {
  postAdded: testSubcription_postAdded | null;
}
