import schema from './schema';

import { ApolloServer } from 'apollo-server';
import buildDataLoaders from './dataLoader/dataLoaders';
require('./util/envConfig');

import { environment } from './util/environment';
import { mongoDbProvider } from './db/mongoDbProvider';
import DbProvider from './db/mongoDbProviderMongoose';
import authentications from './auth/authentication';
import Book from './db/Models/Book';
//import mocks from './test/schemaMock/mocks';

const server = async () => {
  await DbProvider._connect('test');
  await mongoDbProvider.connectAsync('test');
  const mongoDb = {
    Users: mongoDbProvider.usersCollection,
    patientCollection: mongoDbProvider.patientCollection,
  };
  const context = async ({
    req,
    connection,
  }: {
    req: any;
    connection: any;
  }) => {
    if (connection) {
      return connection.context;
    }
    let user = null;
    try {
      user = await authentications(req);
    } catch (error) {}
    return { mongoDb, dataloaders: buildDataLoaders(mongoDb), user };
  };

  const server = new ApolloServer({
    engine: {
      apiKey: environment.apollo.engineKey,
      schemaTag: 'beta',
    },
    schema,
    tracing: true,
    mocks: false,
    context,
    introspection: environment.apollo.introspection,
    playground: environment.apollo.playground,
  });

  server.listen(environment.port).then(({ url }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server ready at ${url}. `);
    }
  });
};

server();
