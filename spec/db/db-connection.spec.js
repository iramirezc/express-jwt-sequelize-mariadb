const db = require("../../src/db/models");

describe("DB Connection", () => {
  it("should be established", () => {
    return db.sequelize.authenticate();
  }, 1000);
});
