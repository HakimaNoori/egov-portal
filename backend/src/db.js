// import pkg from "pg";
// const { Pool } = pkg;
// import dotenv from "dotenv";
// dotenv.config();  // ← حتماً اول


// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD, // حتما string
//   port: Number(process.env.DB_PORT) || 5432,
// });


// pool.on("connect", () => console.log("Connected to PostgreSQL"));
// pool.on("error", (err) => console.error("PostgreSQL error:", err));


import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on("connect", () => console.log("Connected to PostgreSQL"));
pool.on("error", (err) => console.error("PostgreSQL error:", err));

export default pool; // 👈 اضافه شد
