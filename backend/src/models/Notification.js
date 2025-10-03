// models/Notification.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Request from "./Request.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Requests", key: "id" },
    },
    message: { type: DataTypes.STRING, allowNull: false },
    read_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "Notifications", timestamps: false }
);

// Relations
User.hasMany(Notification, { foreignKey: "user_id", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "user_id" });

Request.hasMany(Notification, { foreignKey: "request_id" });
Notification.belongsTo(Request, { foreignKey: "request_id" });

export default Notification;
