const request = require("supertest");
const app = require("../../app");

function createDBTestUser() {
  return app.get("db").User.create({
    firstName: "Björn",
    lastName: "Ironside",
    email: "bjorn@example.com",
    password: "pass_good",
  });
}

describe("Auth API Endpoints", () => {
  afterEach(() => {
    return app.get("db").User.destroy({ truncate: true });
  });

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

    it("should respond with a bad request error when email already exists", () => {
      return createDBTestUser()
        .then(() => {
          return request(app)
            .post("/api/auth/signUp")
            .send({
              firstName: "Björn2",
              lastName: "Ironside2",
              email: "bjorn@example.com",
              password: "pass_good",
            })
            .expect("Content-Type", /json/)
            .expect(400);
        })
        .then((res) => {
          expect(res.body).toEqual({
            status: "fail",
            data: {
              email: "email must be unique",
            },
          });
        });
    });

    it("should respond with a bad request error when payload is not valid", () => {
      return request(app)
        .post("/api/auth/signUp")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual({
            status: "fail",
            data: {
              firstName: "User.firstName cannot be null",
              lastName: "User.lastName cannot be null",
              email: "User.email cannot be null",
              password: "User.password cannot be null",
            },
          });
        });
    });
  });

  describe("POST /api/auth/signIn", () => {
    it("should respond with a JWT token when credentials are valid", () => {
      return createDBTestUser()
        .then(() => {
          return request(app)
            .post("/api/auth/signIn")
            .send({
              email: "bjorn@example.com",
              password: "pass_good",
            })
            .expect("Content-Type", /json/)
            .expect(200);
        })
        .then((res) => {
          expect(res.body).toEqual({
            status: "success",
            data: {
              token: jasmine.any(String),
            },
          });
          expect(res.body.data.token.split("."))
            .withContext("should be a valid JWT")
            .toHaveSize(3);
        });
    });
  });

  describe("User signs up and then signs in", () => {
    it("should create a new account and be able to sign in", () => {
      const agent = request(app);

      return agent
        .post("/api/auth/signUp")
        .send({
          firstName: "Björn",
          lastName: "Ironside",
          email: "bjorn@example.com",
          password: "pass_good",
        })
        .then((res) => {
          return agent
            .post("/api/auth/signIn")
            .send({
              email: res.body.data.email,
              password: "pass_good",
            })
            .expect("Content-Type", /json/)
            .expect(200);
        })
        .then((res) => {
          expect(res.body).toEqual({
            status: "success",
            data: {
              token: jasmine.any(String),
            },
          });
        });
    });
  });
});
