import { CommonErrorStructure } from "./commenErrorStructure";
import { CustomError } from "./customError";

export class NotFoundError extends CustomError{
  statusCode= 404; 
  constructor(){
    super("Route found Error");
    Object.setPrototypeOf(this,NotFoundError.prototype);
  }
  serializeErrors():CommonErrorStructure {
    return {
      errors :[{
        message : "Route Not found "
      }]
      
    }
      
  }
}