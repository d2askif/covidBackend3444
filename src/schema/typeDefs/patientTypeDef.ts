import { gql } from 'apollo-server';

export const patientTypeDef = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ALL
    SIGNUP
    USER
  }

  type Patient {
    name: String
    sex: String
    age: Int
    phoneNumber: String
    city: String
    region: String
  }

  input PatientInput {
    name: String
    sex: String
    age: Int
    phoneNumber: String
    city: String
    region: String
    symptoms: Symptom
  }

  input Symptom {
    chestPain: Boolean
    headAce: Boolean
    cough: Boolean
    favour: Boolean
  }

  type Query {
    getPatients: [Patient]
  }

  type Mutation {
    test: String @auth(requires: ALL)

    registerPatient(input: PatientInput!): Boolean!
  }
`;
