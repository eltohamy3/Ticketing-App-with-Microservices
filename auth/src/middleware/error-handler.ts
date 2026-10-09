import { Request, Response, NextFunction } from "express";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandeler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof RequestValidationError ) {
    return res.status(err.statusCode).send(err.serializeErrors());
  } 
   if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  console.log("Something went wrong ", err);
  res.status(400).send({
    errors: [
      {
        message: err.message ? err.message : "Something went wrong",
      },
    ],
  });
};
