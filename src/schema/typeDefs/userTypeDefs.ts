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

  type Error {
    message: String
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
  type Mutation {
    signin(input: SigninInput): Login
    signup(input: SignupInput): String
  }
`;
