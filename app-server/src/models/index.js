import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Task from './task';
import NonProfit from './nonProfit';
import EmailJob from './emailJob';

const models = {
  User,
  Task,
  NonProfit,
  EmailJob
};

const initModels = () => {
  // Initialize associations if any
  // Example:
  models.User.hasMany(models.Task);
  // models.Post.belongsTo(models.User);
};

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true })
    console.log('Database & tables created with alter: true!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initModels();
syncDatabase();

export { sequelize };
export default models;