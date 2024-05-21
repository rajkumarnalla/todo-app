// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
export type Role = "admin" | "user";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName?: string;
  public emailId!: string;
  public password!: string;
  public role!: Role;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    emailId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize, // passing the `sequelize` instance is required
    underscored: true,
    paranoid: true
  }
);

export default User;