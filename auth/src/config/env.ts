

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname ,'../../.env.development.local')
});

export const env ={
  port: Number(process.env.PORT) || 3000,
  databaseUrl :  process.env.DATABASE_URL  ,
  nodeEnv: process.env.NODE_ENV || 'development',

}