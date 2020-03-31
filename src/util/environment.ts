const defaultPort = 4000;

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
    engineKey: string | undefined;
  };
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
    engineKey: process.env.ENGINE_API_KEY
  },
  port: process.env.PORT || defaultPort
};
