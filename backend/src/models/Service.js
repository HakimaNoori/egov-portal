import { pool } from "../db.js";

export const createService = async ({ name, department_id, fee }) => {
  const result = await pool.query(
    `INSERT INTO services (name, department_id, fee) VALUES ($1, $2, $3) RETURNING *`,
    [name, department_id, fee]
  );
  return result.rows[0];
};

export const getServices = async () => {
  const result = await pool.query(`SELECT * FROM services`);
  return result.rows;
};
