require("dotenv").config();
const { Sequelize } = require("sequelize");

const useSSL = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
    logging: false,
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

  }
);

module.exports = sequelize;
