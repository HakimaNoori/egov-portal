import { pool } from "../db.js";

export const createDepartment = async (name) => {
  const result = await pool.query(
    `INSERT INTO departments (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return result.rows[0];
};

export const getDepartments = async () => {
  const result = await pool.query(`SELECT * FROM departments`);
  return result.rows;
};
