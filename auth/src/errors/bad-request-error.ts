

import { CommonErrorStructure } from "./commenErrorStructure";
import { CustomError } from "./customError";

export class BadRequestError extends CustomError{
  statusCode = 400 ;// for bad Request
  constructor(public message:string){
    super(message);
    Object.setPrototypeOf(this,BadRequestError.prototype);
  }
  serializeErrors(): CommonErrorStructure {
    return {
      errors : [{
        message : this.message 
      }]
    }  
  }
}
