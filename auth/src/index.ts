import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

import { errorHandeler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { env } from "./config/env";
import { DatabaseConnectionError } from "./errors/database-connection-error";
const app = express();

app.use(json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(currentUserRouter);
app.all("*", (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandeler);

const start = async () => {
  try {
    await mongoose.connect(env.databaseUrl);
    console.log("Connecting to MongoDB successfully");
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }
  app.listen(env.port, () => {
    console.log(`listening on port ${env.port}..`);
  });
};
start();
