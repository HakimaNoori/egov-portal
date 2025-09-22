// src/models/User.js
import { pool } from "../db.js";

// فقط ذخیره هش آماده در دیتابیس
export const createUser = async ({
  name,
  email,
  password,
  role,
  department_id,
}) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, department_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, role, department_id] // ← پسورد هش‌شده اینجا میاد
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

export const getUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};

export const updateUser = async (id, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (let key in data) {
    fields.push(`${key} = $${index}`);
    values.push(data[key]);
    index++;
  }

  values.push(id);
  const query = `UPDATE users SET ${fields.join(
    ", "
  )} WHERE id = $${index} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};
