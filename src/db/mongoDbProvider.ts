const MONGO_URL = process.env.MONGO_URL || '';
//'mongodb+srv://daniel:ict4rd2012@cluster0-j7d3x.mongodb.net/test?retryWrites=true&w=majority';

import { Logger, Collection, Db, MongoClient, ObjectID } from 'mongodb';

export class MongoDbProvider {
  private database?: Db;
  private mongoClient: MongoClient;

  constructor(url: string) {
    this.mongoClient = new MongoClient(url, { useUnifiedTopology: true });
    let logCount = 0;

    if (process.env.NODE_ENV === 'development') {
      Logger.setCurrentLogger((msg, state) => {
        console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
      });
      Logger.setLevel('debug');
      Logger.filter('class', ['Cursor']);
    }
  }

  get usersCollection(): Collection {
    const usersCollection = this.getCollection('myUsers');

    if (!usersCollection) {
      throw new Error('Users collection is undefined');
    }

    return usersCollection;
  }

  get locationCollection(): Collection {
    const linkCollection = this.getCollection('locations');
    linkCollection.createIndex({ location: '2dsphere' });
    if (!linkCollection) {
      throw new Error('Users collection is undefined');
    }
    return linkCollection;
  }

  get patientCollection(): Collection {
    const pCollection = this.getCollection('patients');
    if (!pCollection) {
      throw new Error('patients collection is undefined');
    }
    return pCollection;
  }

  /**
   * Connect to MongoDB.
   * @async
   * @param databaseName - Database name.
   */
  async connectAsync(databaseName: string): Promise<void> {
    await this.mongoClient.connect();
    this.mongoClient.isConnected && console.log('connected');

    this.database = this.mongoClient.db(databaseName);
  }

  /**
   * Close the database and its underlying connections.
   */
  async closeAsync(): Promise<void> {
    await this.mongoClient.close();
  }

  /**
   * Fetch a specific collection.
   * @private
   * @param collectionName - Collection name.
   * @returns The collection instance.
   */
  private getCollection(collectionName: string): Collection {
    if (!this.database) {
      throw new Error('Database is undefined.');
    }

    return this.database.collection(collectionName);
  }

  private async createCollection(collectionName: string): Promise<Collection> {
    if (!this.database) {
      throw new Error('Database is undefined.');
    }
    return await this.database.createCollection(collectionName);
  }
}

export const mongoDbProvider = new MongoDbProvider(MONGO_URL);
