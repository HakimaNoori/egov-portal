import sequelize from "../db.js";

// Import models
import User from "./User.js";
import Department from "./Department.js";
import Service from "./Service.js";
import Request from "./Request.js";
import Document from "./Document.js";
import Payment from "./Payment.js";
import Notification from "./Notification.js";

// Associations

// Department ↔ Users
Department.hasMany(User, { foreignKey: "department_id" });
User.belongsTo(Department, { foreignKey: "department_id" });

// Department ↔ Services
Department.hasMany(Service, { foreignKey: "department_id" });
Service.belongsTo(Department, { foreignKey: "department_id" });

// User ↔ Requests
User.hasMany(Request, { foreignKey: "applicant_id" });
Request.belongsTo(User, { foreignKey: "applicant_id" });

// Service ↔ Requests
Service.hasMany(Request, { foreignKey: "service_id" });
Request.belongsTo(Service, { foreignKey: "service_id" });

// Request ↔ Documents
Request.hasMany(Document, { foreignKey: "request_id" });
Document.belongsTo(Request, { foreignKey: "request_id" });

// Request ↔ Payments
Request.hasOne(Payment, { foreignKey: "request_id" });
Payment.belongsTo(Request, { foreignKey: "request_id" });

// User ↔ Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

export {
  sequelize,
  User,
  Department,
  Service,
  Request,
  Document,
  Payment,
  Notification,
};
