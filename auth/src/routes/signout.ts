import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res, next) => {
  res.send("eltoo")
});

export { router as signOutRouter };
