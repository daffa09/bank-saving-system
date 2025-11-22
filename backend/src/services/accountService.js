import { pool } from "../config/database.js";

/**
 * Account Service - Handles account business logic
 */

export async function getAllAccounts() {
  const result = await pool.query(
    `SELECT a.*, c.name AS customer_name, d.name AS deposito_name, d.yearly_return
     FROM accounts a
     JOIN customers c ON a.customer_id = c.id
     JOIN deposito_types d ON a.deposito_type_id = d.id
     ORDER BY a.id ASC`
  );
  return result.rows;
}

export async function getAccountById(id) {
  const result = await pool.query(
    `SELECT a.*, c.name AS customer_name, d.name AS deposito_name, d.yearly_return
     FROM accounts a
     JOIN customers c ON a.customer_id = c.id
     JOIN deposito_types d ON a.deposito_type_id = d.id
     WHERE a.id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function createAccount(
  packet,
  customerId,
  depositoTypeId,
  balance = 0,
  openedAt = null
) {
  const result = await pool.query(
    `INSERT INTO accounts(packet, customer_id, deposito_type_id, balance, opened_at)
     VALUES($1, $2, $3, $4, COALESCE($5, CURRENT_DATE))
     RETURNING *`,
    [packet, customerId, depositoTypeId, balance, openedAt]
  );
  return result.rows[0];
}

export async function updateAccount(
  id,
  packet,
  customerId,
  depositoTypeId,
  openedAt = null
) {
  const result = await pool.query(
    `UPDATE accounts 
     SET packet = $1, customer_id = $2, deposito_type_id = $3, opened_at = COALESCE($4, opened_at)
     WHERE id = $5
     RETURNING *`,
    [packet, customerId, depositoTypeId, openedAt, id]
  );
  return result.rows[0];
}

export async function deleteAccount(id) {
  const result = await pool.query("DELETE FROM accounts WHERE id = $1", [id]);
  return result.rowCount > 0;
}

export async function updateAccountBalance(id, newBalance) {
  const result = await pool.query(
    "UPDATE accounts SET balance = $1 WHERE id = $2 RETURNING *",
    [newBalance, id]
  );
  return result.rows[0];
}
