import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.ts";
import { Stores } from "./stores.model.ts";
import { Customers } from "./customers.model.ts";
import { Products } from "./products.model.ts";

export class Orders extends Model {
  public id!: number;
  public customer_id!: number;
  public product_id!: number;
  public store_id!: number;
  public state!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state: {
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
    tableName: "orders",
    timestamps: false,
  }
);

Customers.hasMany(Orders, { foreignKey: 'customer_id'})
Orders.belongsTo(Customers, { foreignKey: 'customer_id'})
Products.hasMany(Orders, { foreignKey: 'product_id'})
Orders.belongsTo(Products, { foreignKey: 'product_id'})
Stores.hasMany(Orders, { foreignKey: 'store_id'})
Orders.belongsTo(Stores, { foreignKey: 'store_id'})
