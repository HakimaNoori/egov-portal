// routes/users.js
import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

// 🔹 Registration (citizen self-register)
router.post("/register", usersController.registerCitizen);

// 🔹 Login (all roles)
router.post("/login", usersController.login);

// 🔹 Get own profile (all roles)
router.get("/me", authenticate, usersController.getProfile);

// 🔹 Create user (dhead restricted, admin full access)
router.post(
  "/create",
  authenticate,
  authorize("dhead"), // dhead+admin can access
  usersController.createUser
);

// 🔹 Update user (dhead restricted, admin full access)
router.put(
  "/:id",
  authenticate,
  authorize("dhead"), // dhead+admin can access
  usersController.updateUser
);

// 🔹 Delete user (admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  usersController.deleteUser
);

// 🔹 List all users (admin only)
router.get(
  "/",
  authenticate,
  authorize("dhead"),
  usersController.listUsers
);

export default router;
