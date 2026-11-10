

import request from 'supertest'
import {app}  from '../../app';
import { expect, it } from '@jest/globals';



it('respond with details about the current user' ,async()=>{

    const cookie = await global.signup();


     const responce2 =   await request(app).get('/api/users/currentuser').set('Cookie' , cookie).send().expect(200);

    expect(responce2.body.currentUser.email).toEqual('test@test.com'); 
})

it('responds with null if not authenticated' , async()=>{
  const response = await request(app).get('/api/users/currentuser').send().expect(200);
  expect(response.body.currentUser).toEqual(null);


})
