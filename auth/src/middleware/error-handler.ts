import { Request, Response, NextFunction } from "express";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandeler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof RequestValidationError) {
    console.log("handling this error as a request validation error");
    return res.status(400).send({
      errors: formattedErrors,
    });
  } else if (err instanceof DatabaseConnectionError) {
    console.log("handling this error as a request DatabaseConnectionError");
    return res.status(500).send({
      errors: [
        {
          message: err.reason,
        },
      ],
    });
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
