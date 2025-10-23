import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.ts";

export class Stores extends Model {
  public id!: number;
  public name!: string;
  public state!: string;
  public stock!: number
  public created_at!: Date;
  public updated_at!: Date;
}

Stores.init(
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
    state: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
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
    tableName: "stores",
    timestamps: false,
  }
);
