import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';

import { patientTypeDef } from './typeDefs/patientTypeDef';
import { patientResolver } from './resolvers/patientResolver';
import { userResolver } from './resolvers/userResolver';
import AuthDirective from '../common/AuthDirective';
import { userTypeDef } from './typeDefs/userTypeDefs';

const patientSchema = makeExecutableSchema({
  resolvers: [patientResolver],
  typeDefs: [patientTypeDef],
});
const userSchema = makeExecutableSchema({
  resolvers: [userResolver],
  typeDefs: [userTypeDef],
});

export default mergeSchemas({
  schemas: [patientSchema, userSchema /* remoteSchema */],
});
