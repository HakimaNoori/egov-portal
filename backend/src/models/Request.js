import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Service from "./Service.js";

const Request = sequelize.define(
  "Request",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Services",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "reviewed", "approved", "rejected"),
      defaultValue: "pending",
    },
    officer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    dhead_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Requests",
    timestamps: false,
  }
);

// Relations
User.hasMany(Request, { foreignKey: "applicant_id", as: "myRequests" });
Request.belongsTo(User, { foreignKey: "applicant_id", as: "applicant" });

Service.hasMany(Request, { foreignKey: "service_id" });
Request.belongsTo(Service, { foreignKey: "service_id" });

export default Request;
