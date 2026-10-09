import { CommonErrorStructure } from "./commenErrorStructure";


export interface CustomError{
serializeErrors():CommonErrorStructure; 
statusCode:number ;
}