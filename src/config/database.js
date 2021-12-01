require("dotenv").config();

const config = {
  username: process.env.MARIADB_USER || "root",
  password: process.env.MARIADB_PASSWORD || null,
  database: process.env.MARIADB_DATABASE || "my_db",
  host: process.env.MARIADB_HOST || "127.0.0.1",
  port: process.env.MARIADB_PORT || 3306,
  dialect: "mariadb",
  seederStorage: "sequelize",
};

module.exports = {
  development: { ...config },
  test: { ...config },
  production: { ...config },
};
