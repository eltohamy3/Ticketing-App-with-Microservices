import mongoose from "mongoose";
import { env } from "../config/env";
import { DatabaseConnectionError } from "../errors/database-connection-error";


export const  ConnectDatabase = async ()=>{
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await mongoose.connect(env.databaseUrl, { serverSelectionTimeoutMS: 5000 });
      console.log("Connected to MongoDB successfully");
      break;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt}/${maxAttempts} failed:`, err);

      if (attempt === maxAttempts) {
        throw new DatabaseConnectionError();
      }

      const retryDelay = Math.min(1000 * 2 ** (attempt - 1), 8000);
      console.log(`Retrying MongoDB connection in ${retryDelay / 1000} seconds`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

}
