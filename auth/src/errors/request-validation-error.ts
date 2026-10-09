import { ValidationError } from "express-validator";
import { CustomError } from "./customError";
import { CommonErrorStructure } from "./commenErrorStructure";

export class RequestValidationError extends Error  implements CustomError{
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super();
    // add this because we are extend a built in class
    // That line ensures your custom error class works correctly when extending Error, especially for instanceof checks and inheritance behavior.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors(): CommonErrorStructure {
    const formattedErrors = this.errors
      .filter((error) => error.type === "field")
      .map((error) => {
        return {
          message: error.msg as string,
          field: error.path,
        };
      });
    return {
      errors: formattedErrors,
    };
  }
}
