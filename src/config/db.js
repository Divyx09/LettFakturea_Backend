const { Sequelize } = require("sequelize");
require("dotenv").config(); // to read from .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

module.exports = sequelize;
