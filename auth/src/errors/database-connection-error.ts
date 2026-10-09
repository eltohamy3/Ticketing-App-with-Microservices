
import { CommonErrorStructure } from "./commenErrorStructure";
import { CustomError } from "./customError";
export class DatabaseConnectionError extends  CustomError{
  statusCode = 500 ;

 private reason = 'Error Connection to Database';
  constructor(){
    super("Error Connection to Database");
    Object.setPrototypeOf(this ,DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return {
      errors : [{
        message : this.reason
      }]
    }
  }
  
}