require('./envConfig');
const defaultPort = 4000;
const defaultSecret = 'secret';
interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
    engineKey: string | undefined;
  };
  secret: string;
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
    engineKey: process.env.ENGINE_API_KEY,
  },
  secret: process.env.SECRET || defaultSecret,
  port: process.env.PORT || defaultPort,
};
