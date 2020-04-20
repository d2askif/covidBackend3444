import { gql } from 'apollo-server';

export const userTypeDef = gql`
  type User {
    email: String
    firstName: String
    lastName: String
    active: Boolean
    verified: Boolean
    role: String
  }
  type ValidationError {
    field: String
    error: [String]
  }
  type Error {
    result: [ValidationError]
  }

  type Login {
    token: String!
    user: User!
  }

  type Signup {
    token: String!
  }

  type Query {
    me: User
  }

  input SigninInput {
    email: String
    password: String
  }

  input SignupInput {
    email: String
    password: String
    firstName: String
    lastName: String
  }

  union LoginType = Login | Error

  type Mutation {
    signin(input: SigninInput): LoginType
    signup(input: SignupInput): String
    confirmUser(token: String): Boolean
  }
`;
