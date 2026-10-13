import { UserDoc } from "../models/user"


import { Response , Request } from "express"
import jwt from 'jsonwebtoken' ;
import { env } from "../config/env";
export const generateAndSendJwt = (req : Request , res: Response , user : UserDoc , statusCod : number )=>{

    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      env.jwtKey 
     );

    // Store it on session Object
    req.session = {
      jwt : userJwt
    }
    res.status(statusCod).send(user);
}