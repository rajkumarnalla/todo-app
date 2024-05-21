require('dotenv').config();

import { Sequelize } from "sequelize";
const {DATABASE, DB_USER, DB_PWD, DB_HOST} = process.env;

const sequelize = new Sequelize(
  DATABASE as string, 
  DB_USER as string, 
  DB_PWD as string, 
  {
    dialect: "mysql",
    host: DB_HOST,
    port: 3306,
    logging: console.log,
  }
);

export default sequelize;
