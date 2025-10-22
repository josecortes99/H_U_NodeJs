import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.ts";

export class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public rol!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
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
    tableName: "users",
    timestamps: false,
  }
);
