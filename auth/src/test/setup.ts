import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, jest  , afterAll, beforeEach} from "@jest/globals";

import mongoose from "mongoose";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import  request  from "supertest";
import { app } from "../app";

declare global{
  var signup : ()=>Promise<string[]>; 
}

global.signup= async()=>{
  const email = 'test@test.com' ; 
  const password = 'password'; 
  const responce = await request(app).post('/api/users/signup').send({email,password}).expect(201);

  const cookie = responce.get('Set-Cookie');
  if (!cookie) throw new Error('Expected cookie but got undefined');
  return cookie; 
}
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
