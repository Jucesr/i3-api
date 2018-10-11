const dbconfig = require('../config/database');
const Sequelize = require('sequelize');

const config = dbconfig[process.env.NODE_ENV];

const database = new Sequelize(
    config.database,
    config.username,
    config.password, {
      host: config.host,
      dialect: config.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
);

module.exports = database;

