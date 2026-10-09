
import { CommonErrorStructure } from "./commenErrorStructure";
import { CustomError } from "./customError";
export class DatabaseConnectionError extends Error  implements CustomError{
  statusCode = 500 ;

 private reason = 'Error Connection to Database';
  constructor(){
    super();
    Object.setPrototypeOf(this ,DatabaseConnectionError.prototype);
  }
  serializeErrors():CommonErrorStructure {
    return {
      errors : [{
        message : this.reason
      }]
    }
  }
  
}