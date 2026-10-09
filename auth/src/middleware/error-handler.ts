import { Request, Response, NextFunction } from "express";

import { CustomError } from "../errors/customError";
 
export const errorHandeler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError ) {
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
