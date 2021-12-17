const request = require("supertest");
const app = require("../../app");

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
  });

  describe("POST /api/auth/signIn", () => {
    it("should return a JWT token when credentials are valid", () => {
      return app
        .get("db")
        .User.create({
          firstName: "Bjorn",
          lastName: "Ironside",
          email: "bjorn@example.com",
          password: "pass_good",
        })
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
