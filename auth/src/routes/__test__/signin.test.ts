import request from 'supertest'
import {app}  from '../../app';
import { expect, it } from '@jest/globals';



it('Returns a 400 when an email that not exist is supplied' , async()=>{
  await request(app).post('/api/users/signin').send({
    email : 'test@test.com',
    password : 'password'
  }).expect(400);
});

it('fails when an incorrect password is supplied' , async()=>{
  await request(app).post('/api/users/signup').send({
    email : 'test@test.com',
    password : 'password'
  }).expect(201);

  await request(app).post('/api/users/signin').send({
    email : 'test@test.com',
    password : 'passwor'
  }).expect(400);

}) ;

it('responds with a cookie when given valid credent' , async ()=>{
  await request(app).post('/api/users/signup').send({
    email : 'test@test.com',
    password : 'password'
  }).expect(201);

  const responce = await request(app).post('/api/users/signin').send({
    email : 'test@test.com',
    password : 'password'
  }).expect(200);

  expect(responce.get('Set-Cookie')).toBeDefined();


})