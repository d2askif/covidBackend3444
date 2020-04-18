import mongoose from 'mongoose';
const MONGO_DB_SERVER = process.env.MONGO_DB_SERVER || '';

class DbProvider {
  private isConnected: boolean;
  constructor() {
    this.isConnected = false;
  }

  async _connect(dbName: string) {
    const DB_URL = MONGO_DB_SERVER + dbName;
    if (!this.isConnected) {
      const monitor = mongoose.connection;
      monitor.on('open', async () => {
        console.log('MongoDb connected by mongoose');
      });

      monitor.on('error', () => {
        console.log('DB connection error');
      });

      const connection = await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
      });

      this.isConnected = connection.connection.readyState !== 0;
    }
  }

  isDbConnected() {
    return this.isConnected;
  }
}

export default new DbProvider();
