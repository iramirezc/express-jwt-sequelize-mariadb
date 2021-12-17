const db = require("../../src/db/models");

beforeAll(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database has been established.");
  } catch (err) {
    console.error(err);
    fail("Unable to connect to the database.");
  }

  try {
    await db.sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error(err);
    fail("Unable to synchronized the models.");
  }
}, 1000);

afterAll(async () => {
  await db.sequelize.close();
  console.log("\nConnection to the database has been closed.");
});
