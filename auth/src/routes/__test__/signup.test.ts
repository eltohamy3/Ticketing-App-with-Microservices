

import request from 'supertest'
import {app}  from '../../app';


it ('returns a 201 on successful signup' , async()=>{
  return await request(app)
  .post('/api/users/signup')
  .send({
    email : 'test@test.com' , 
    password : 'password'
  })
  .expect(201);
});


it('returns a 400 with an invalid email' , async ()=>{
  return await request(app).post('/api/users/signup').send({
    email : 'eltoo' , 
    password: 'dkjfkdjfkdjf'
  }).expect(400);

});
it('returns a 400 with an invalid password' , async ()=>{
  return await request(app).post('/api/users/signup').send({
    email : 'eltoo' , 
    password: 'p'
  }).expect(400);

});
it('returns a 400 with an missing email and  password' , async ()=>{
  return await request(app).post('/api/users/signup').send({
  }).expect(400);

})