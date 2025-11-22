import { pool } from "../config/database.js";

/**
 * Customer Service - Handles all customer-related business logic
 */

export async function getAllCustomers() {
  const result = await pool.query("SELECT * FROM customers ORDER BY id ASC");
  return result.rows;
}

export async function getCustomerById(id) {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

export async function createCustomer(name) {
  const result = await pool.query(
    "INSERT INTO customers(name) VALUES($1) RETURNING *",
    [name]
  );
  return result.rows[0];
}

export async function updateCustomer(id, name) {
  const result = await pool.query(
    "UPDATE customers SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
}

export async function deleteCustomer(id) {
  const result = await pool.query("DELETE FROM customers WHERE id = $1", [id]);
  return result.rowCount > 0;
}
