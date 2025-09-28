require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307,
    dialect: 'mariadb', 
    logging: false,
  }
);
