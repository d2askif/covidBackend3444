import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.prod`;

    break;
  default:
    path = `${__dirname}/../../.env.dev`;
}

dotenv.config({ path: path });

export const MONGO_URI = process.env.MONGO_URI;
