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
    getPatients: async (
      _: any,
      __: any,
      {
        mongoDb: { patientCollection },
      }: { mongoDb: { patientCollection: Collection } }
    ) => {
      /*const agg = await patientCollection
        .aggregate([{ $group: { _id: '$region', count: { $sum: 1 } } }])
        .toArray();*/

      // console.log('Agg', agg);

      const patients = await patientCollection.find({}).toArray();

      return patients;
    },
  },
  Mutation: {
    registerPatient: async (
      _: any,
      { input }: InputDto<Patient>,
      {
        mongoDb: { patientCollection },
      }: { mongoDb: { patientCollection: Collection } }
    ) => {
      const response = await patientCollection.insert(input);

      return true;
    },
    test: async (_: any, arg: any, cxt: any) => {
      return 'test';
    },
  },
  Patient: {},
};
