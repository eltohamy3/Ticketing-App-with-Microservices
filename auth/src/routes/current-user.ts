import express from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
const router = express.Router();

router.get("/api/users/currentuser", (req, res, next) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(req.session?.jwt, env.jwtKey);
     res.send({currentUser : payload})
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
