require('dotenv').config();
const {DATABASE, DB_USER, DB_PWD, DB_HOST} = process.env;

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PWD,
    "database": DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PWD,
    "database": DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PWD,
    "database": DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}
