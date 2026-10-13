

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";

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
    




  },
);
export { router as signInRouter };
