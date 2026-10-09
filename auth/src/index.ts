import express from 'express'
import 'express-async-errors'
import  {json} from 'body-parser'

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';

import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

import { errorHandeler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express();

app.use(json());


app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(currentUserRouter);
app.all('*' ,   (req , res ,next)=>{
  throw new NotFoundError();
})
app.use(errorHandeler);
app.listen(3000,()=>{
  console.log("listening on port 3000..")
})