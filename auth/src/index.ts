import express from 'express'
import  {json} from 'body-parser'


const app = express();

app.use(json());


app.post('/api/users/signup'  , (req, res, next)=>{
  res.send("user Created")
  
});
app.post('/api/users/signin' , (req , res, next)=>{
  res.send("user sign in correctly")
})
app.post('/api/users/out' , (req , res, next)=>{
  res.send("user sign out correctly")
})
app.get('/api/users/currentuser' , (req , res, next)=>{
  res.send("email : eltoo@gmail.com")
})


app.listen(3000,()=>{
  console.log("listening on port 3000..")
})