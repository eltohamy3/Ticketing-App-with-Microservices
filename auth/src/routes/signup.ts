import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";
import { generateAndSendJwt } from "../services/genrateAndSendJwt";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      console.log("Email in use");
      // return res.send('Email is currently exist');
      throw new BadRequestError("Email is currently exist");
    }

    // create a new User
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT and send it
    generateAndSendJwt(req, res, user, 201);
  },
);

export { router as signUpRouter };
