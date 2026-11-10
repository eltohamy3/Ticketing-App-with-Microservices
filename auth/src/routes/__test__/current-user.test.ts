

import request from 'supertest'
import {app}  from '../../app';
import { expect, it } from '@jest/globals';



it('respond with details about the current user' ,async()=>{
 const responce1 =  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    const cookie = responce1.get('Set-Cookie');
    if (!cookie){
      throw new Error("Cookie not set after signup");
    }


     const responce2 =   await request(app).get('/api/users/currentuser').set('Cookie' , cookie).send().expect(200);

    expect(responce2.body.currentUser.email).toEqual('test@test.com'); 
})
