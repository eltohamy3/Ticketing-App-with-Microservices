import request from "supertest";
import { app } from "../../app";
import { expect, it } from "@jest/globals";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const responce = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200); 
  const cookie = responce.get("Set-Cookie"); 
  if (!cookie) { // handel undefined type
    throw new Error("Expected cookie but got undefined.");
  }
  expect(cookie[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  );
});
