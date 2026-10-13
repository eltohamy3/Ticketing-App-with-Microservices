import { CommonErrorStructure } from "./commenErrorStructure";
import { CustomError} from "./customError";


export class NotAuthorizedError extends CustomError{
  statusCode= 401; 
  constructor(){
    super("Not authorized Access");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeErrors(): CommonErrorStructure {
    return {
      errors : [{
        message : this.message
      }]
    }
  }
}