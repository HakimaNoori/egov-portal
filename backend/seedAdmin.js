// seedAdmin.js
import bcrypt from "bcryptjs";
import { sequelize } from "./src/models/index.js";
import User from "./src/models/User.js";

async function seedAdmin() {
  try {
    console.log("🔄 Starting admin seed...");

    // Sync database (creates tables if they don't exist)
    await sequelize.sync();
    console.log("✅ Database synced");

    // Use environment variables with fallbacks
    const adminEmail = process.env.ADMIN_EMAIL || "admin@system.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminName = process.env.ADMIN_NAME || "System Administrator";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      where: { email: adminEmail } 
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return { success: true, message: "Admin already exists" };
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password_hash: hashedPassword,
      role: "admin",
      department_id: null
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);
    console.log("👤 Role: admin");
    console.log("🆔 ID:", adminUser.id);
    console.log("⚠️  Remember to change the password after first login!");

    return { 
      success: true, 
      message: "Admin user created successfully",
      email: adminEmail 
    };

  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    // Don't crash the server if seeding fails
    console.log("⚠️  Continuing server startup despite seed error...");
    return { 
      success: false, 
      message: "Seed failed", 
      error: error.message 
    };
  }
}

export default seedAdmin;