import { pool } from "../config/database.js";

/**
 * Deposito Type Service - Handles deposito type business logic
 */

export async function getAllDepositoTypes() {
  const result = await pool.query(
    "SELECT * FROM deposito_types ORDER BY id ASC"
  );
  return result.rows;
}

export async function getDepositoTypeById(id) {
  const result = await pool.query(
    "SELECT * FROM deposito_types WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function createDepositoType(name, yearlyReturn) {
  const result = await pool.query(
    "INSERT INTO deposito_types(name, yearly_return) VALUES($1, $2) RETURNING *",
    [name, yearlyReturn]
  );
  return result.rows[0];
}

export async function updateDepositoType(id, name, yearlyReturn) {
  const result = await pool.query(
    "UPDATE deposito_types SET name = $1, yearly_return = $2 WHERE id = $3 RETURNING *",
    [name, yearlyReturn, id]
  );
  return result.rows[0];
}

export async function deleteDepositoType(id) {
  const result = await pool.query(
    "DELETE FROM deposito_types WHERE id = $1",
    [id]
  );
  return result.rowCount > 0;
}
