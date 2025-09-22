import { pool } from "../db.js";

export const createRequest = async ({ user_id, service_id }) => {
  const result = await pool.query(
    `INSERT INTO requests (user_id, service_id) VALUES ($1, $2) RETURNING *`,
    [user_id, service_id]
  );
  return result.rows[0];
};

export const getRequests = async () => {
  const result = await pool.query(`SELECT * FROM requests`);
  return result.rows;
};

export const updateRequestStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE requests SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};
