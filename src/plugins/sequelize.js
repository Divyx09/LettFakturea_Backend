const fp = require("fastify-plugin");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = fp(async (fastify, opts) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // allow self-signed
      },
      family: 4, // force IPv4 instead of IPv6
    },
  });

  try {
    await sequelize.authenticate();
    fastify.log.info("Database connected");
  } catch (err) {
    fastify.log.error("Database connection failed:", err);
    throw err;
  }

  // Define models
  const Term = require("../models/term")(sequelize, DataTypes);
  const Product = require("../models/product")(sequelize, DataTypes);

  await sequelize.sync();

  // Attach db + models to fastify
  fastify.decorate("db", {
    sequelize,
    models: {
      term: Term,
      product: Product,
    },
  });
});
