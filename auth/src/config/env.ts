

import dotenv from 'dotenv'
import path from 'path'

// dotenv.config({
//   path: path.resolve(__dirname ,'../../.env.development.local')
// });

export const env ={
  port: Number(process.env.PORT) || 3000,
  databaseUrl :  process.env.DATABASE_URL  ,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtKey: process.env.JWT_KEY  ,
  
  jwtExpires : process.env.JWT_EXPIRES_IN , 
  cookieExpires : Number(process.env.JWT_COOKIE_EXPIRES_IN)  


}