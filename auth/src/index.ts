import express from 'express'
import  {json} from 'body-parser'


const app = express();

app.use(json());


app.post('/api/users/signup'  , ()=>{
  
})

app.listen(3000,()=>{
  console.log("listening on port 3000.")
})