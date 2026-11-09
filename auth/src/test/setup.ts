import { MongoMemoryServer } from "mongodb-memory-server";

import mongoose from "mongoose";
import { DatabaseConnectionError } from "../errors/database-connection-error";

jest.setTimeout(60000);

process.env.JWT_KEY = "test-only-jwt-key";

let mongo: MongoMemoryServer | undefined;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new DatabaseConnectionError();
  }

  const collections = (await db.collections()) || [];
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
  } finally {
    await mongo?.stop();
  }
}); 
