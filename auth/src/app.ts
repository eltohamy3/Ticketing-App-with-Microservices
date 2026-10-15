import express from "express";
import "express-async-errors";
import { json } from "body-parser";


import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

import { errorHandeler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { env } from "./config/env";
const app = express();

app.set ('trust proxy' , true);
app.use(json());
app.use(cookieSession({
  name : 'session' , 
  maxAge : 15 * 60 *60*1000 , 
  signed :false , 
  secure : env.nodeEnv === "production",
  httpOnly : true

}))
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(currentUserRouter);
app.all("*", (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandeler);

export {app} ;
