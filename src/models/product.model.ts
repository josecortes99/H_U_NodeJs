import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.ts";
import { Customers } from "../models/customers.model.ts";

export class Products extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public store_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Products.init(
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
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    customer_id: {
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
    tableName: "products",
    timestamps: false,
  }
);

Customers.hasMany(Products, { foreignKey: "customer_id" });
Products.belongsTo(Customers, { foreignKey: "customer_id" });
