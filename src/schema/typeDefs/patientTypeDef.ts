import { gql } from 'apollo-server';

export const patientTypeDef = gql`
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
    registerPatient(input: PatientInput!): Boolean!
  }
`;
