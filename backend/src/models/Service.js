// models/Service.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Department from "./Department.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Departments",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Services",
    timestamps: false,
  }
);

// Relations
Department.hasMany(Service, { foreignKey: "department_id" });
Service.belongsTo(Department, { foreignKey: "department_id" });

export default Service;
