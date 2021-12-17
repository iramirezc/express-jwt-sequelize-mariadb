const request = require("supertest");
const app = require("../../app");

describe("POST /api/auth/signUp", () => {
  it("should create a new account", () => {
    return request(app)
      .post("/api/auth/signUp")
      .send({
        firstName: "Björn",
        lastName: "Ironside",
        email: "bjorn@example.com",
        password: "pass_good",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          status: "success",
          data: {
            id: jasmine.any(Number),
            firstName: "Björn",
            lastName: "Ironside",
            email: "bjorn@example.com",
            createdAt: jasmine.any(String),
            updatedAt: jasmine.any(String),
          },
        });

        expect(new Date(res.body.data.createdAt).getTime())
          .withContext("createdAt should be a valid date")
          .not.toBeNaN();

        expect(new Date(res.body.data.updatedAt).getTime())
          .withContext("updatedAt should be a valid date")
          .not.toBeNaN();
      });
  });
});
