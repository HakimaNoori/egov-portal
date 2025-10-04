import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Database & Models
import { sequelize } from "./src/models/index.js";

// Routes
import userRoutes from "./src/routes/users.js";
import departmentRoutes from "./src/routes/departments.js";
import serviceRoutes from "./src/routes/services.js";
import requestRoutes from "./src/routes/requests.js";
import paymentRoutes from "./src/routes/payments.js";
import notificationRoutes from "./src/routes/notifications.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("E-Government Portal Backend is running!");
});

// Start server + DB connection
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync all models with associations
    await sequelize.sync({ alter: true }); 
    console.log("✅ All models synchronized");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
