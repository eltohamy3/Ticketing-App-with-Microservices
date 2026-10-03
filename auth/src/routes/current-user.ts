
import express from "express"

const router = express.Router();

router.get('/api/users/currentuser' , (req, res, next)=>{
  res.send("current User");

})

export {router as currentUserRouter}