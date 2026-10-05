

export class DatabaseConnectionError extends Error{

  reason = 'Error Connection to Database';
  constructor(){
    super();
    Object.setPrototypeOf(this ,DatabaseConnectionError.prototype);
  }
}