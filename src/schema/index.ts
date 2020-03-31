import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';

import { patientTypeDef } from './typeDefs/patientTypeDef';
import { patientResolver } from './resolvers/patientResolver';

const patientSchema = makeExecutableSchema({
  resolvers: [patientResolver],
  typeDefs: [patientTypeDef]
});

export default mergeSchemas({
  schemas: [patientSchema /* remoteSchema */]
});
