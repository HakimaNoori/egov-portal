// models/Document.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Request from "./Request.js";

const Document = sequelize.define(
  "Document",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Requests", key: "id" },
    },
    file_path: { type: DataTypes.STRING, allowNull: false },
    file_type: { type: DataTypes.STRING, allowNull: true },
    uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "Documents", timestamps: false }
);

// Relations
Request.hasMany(Document, { foreignKey: "request_id", as: "documents" });
Document.belongsTo(Request, { foreignKey: "request_id" });

export default Document;
