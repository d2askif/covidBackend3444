import { Collection } from 'mongodb';
type InputDto<T> = {
  input: T;
};

interface Patient {
  name: string;
  sex: string;
  age: number;
  phoneNumber: string;
  city: string;
  region: string;
}

interface Symptom {
  chestPain: boolean;
  headAce: boolean;
  cough: boolean;
  favour: boolean;
}

export const patientResolver = {
  Query: {
    getPatients: async (_: any, __: any, { mongoDb }: any) => {
      const patients = await mongoDb.patientCollection.find({}).toArray();
      console.log(patients);

      return patients;
    }
  },
  Mutation: {
    registerPatient: async (
      _: any,
      { input }: InputDto<Patient>,
      {
        mongoDb: { patientCollection }
      }: { mongoDb: { patientCollection: Collection } }
    ) => {
      console.log(input);
      const response = await patientCollection.insert(input);

      console.log('inserted id', response.insertedIds[0]);

      return true;
    }
  },
  Patient: {}
};
