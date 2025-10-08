import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Request from "./Request.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Requests", key: "id" },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("credit_card", "paypal", "bank_transfer", "onsite"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "rejected"),
      defaultValue: "pending",
    },
  },
  { tableName: "payments", timestamps: true }
);

// relations
Payment.belongsTo(Request, { foreignKey: "request_id" });

export default Payment;
