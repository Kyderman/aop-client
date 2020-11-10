/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ValidateUserQuery
// ====================================================

export interface ValidateUserQuery_validateUser {
  __typename: "User";
  _id: string | null;
}

export interface ValidateUserQuery {
  validateUser: ValidateUserQuery_validateUser | null;
}

export interface ValidateUserQueryVariables {
  idToken?: string | null;
}
