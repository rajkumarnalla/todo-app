import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class NonProfit extends Model {
  public id!: number;
  public name!: string;
  public address?: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

NonProfit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    address: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "non_profits",
    sequelize, // passing the `sequelize` instance is required
    underscored: true,
    paranoid: true,
    getterMethods: {}
  }
);

export default NonProfit;
