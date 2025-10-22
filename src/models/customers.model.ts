import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.ts";

export class Customers extends Model {
  public id!: number;
  public identification!: string;
  public name!: string;
  public email!: string;
  public address!: string
  public created_at!: Date;
  public updated_at!: Date;
}

Customers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identification: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: false,
  }
);
