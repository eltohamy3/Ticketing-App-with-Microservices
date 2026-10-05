

import { ValidationError } from "express-validator";

export class RequestValidationError extends Error{

  constructor(public  errors : ValidationError[]){
    super();
    // add this because we are extend a built in class
    // That line ensures your custom error class works correctly when extending Error, especially for instanceof checks and inheritance behavior.

    Object.setPrototypeOf(this,RequestValidationError.prototype);

  }
}