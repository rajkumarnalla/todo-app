// src/models/user.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
export type TaskStatus = "To Do" | "In Progress" | "Done";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: TaskStatus;
  public dueDate?: Date;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
    },
    dueDate: {
      type: new DataTypes.DATE(),
    },
    userId: {
      type: new DataTypes.INTEGER(),
    },
  },
  {
    tableName: "tasks",
    sequelize, // passing the `sequelize` instance is required
    underscored: true,
    paranoid: true,
    getterMethods: {
      formattedDueDate() {
        return this.dueDate ? this.dueDate.toISOString().split('T')[0] : null;
      }
    }
  }
);

export default Task;
