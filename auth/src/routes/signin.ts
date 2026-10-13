

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { generateAndSendJwt } from "../middleware/genrateAndSendJwt";

const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must supply a password"),
  ],
  validateRequest
  ,
  async (req: Request, res: Response) => {
    const {email, password } = req.body ;
    const existingUser = await User.findOne({email}).select("+password");
    if (!existingUser || ! await Password.compare(password , existingUser.password)){
      throw new BadRequestError("Invalid email or password ");
    }
    // ok User is Logged in 
    // Generate JWT and send it 
    generateAndSendJwt(req , res , existingUser , 200);
  },
);
export { router as signInRouter };
