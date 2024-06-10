import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class EmailJob extends Model {
  public id!: number;
  public toEmail!: string;
  public body!: string;
  public status!: string;
  public attempts?: string;
  public errorMessage?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

EmailJob.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    toEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "queued",
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "email_jobs",
    sequelize, // passing the `sequelize` instance is required
    underscored: true,
    paranoid: true,
  }
);

export default EmailJob;
