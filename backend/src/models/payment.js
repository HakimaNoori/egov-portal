import { pool } from "../db.js";

export const createPayment = async ({ request_id, amount, status }) => {
  const result = await pool.query(
    `INSERT INTO payments (request_id, amount, status) VALUES ($1, $2, $3) RETURNING *`,
    [request_id, amount, status]
  );
  return result.rows[0];
};

export const getPayments = async () => {
  const result = await pool.query(`SELECT * FROM payments`);
  return result.rows;
};

export const updatePaymentStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE payments SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};
