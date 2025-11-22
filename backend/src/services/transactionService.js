import { pool } from "../config/database.js";
import { diffMonths, calculateInterest } from "../utils/helpers.js";

/**
 * Transaction Service - Handles deposit and withdraw operations
 */

export async function depositToAccount(accountId, amount, depositDate = null) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Lock and get account
    const accResult = await client.query(
      "SELECT * FROM accounts WHERE id = $1 FOR UPDATE",
      [accountId]
    );

    if (accResult.rowCount === 0) {
      await client.query("ROLLBACK");
      throw new Error("Account not found");
    }

    const account = accResult.rows[0];
    const newBalance = Number(account.balance) + Number(amount);

    // Update balance
    await client.query("UPDATE accounts SET balance = $1 WHERE id = $2", [
      newBalance,
      accountId,
    ]);

    // Record transaction
    await client.query(
      "INSERT INTO transactions(account_id, type, amount, created_at) VALUES($1, 'DEPOSIT', $2, COALESCE($3, NOW()))",
      [accountId, amount, depositDate]
    );

    await client.query("COMMIT");

    return {
      success: true,
      message: "Deposit successful",
      balance: newBalance,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function withdrawFromAccount(accountId, withdrawalDate) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Lock and get account with deposito type info
    const accResult = await client.query(
      `SELECT a.*, d.yearly_return
       FROM accounts a
       JOIN deposito_types d ON a.deposito_type_id = d.id
       WHERE a.id = $1
       FOR UPDATE`,
      [accountId]
    );

    if (accResult.rowCount === 0) {
      await client.query("ROLLBACK");
      throw new Error("Account not found");
    }

    const account = accResult.rows[0];
    const startingBalance = Number(account.balance);

    if (startingBalance <= 0) {
      await client.query("ROLLBACK");
      throw new Error("Account balance is zero or negative");
    }

    // Calculate interest
    const months = diffMonths(account.opened_at, withdrawalDate);
    const yearlyReturn = Number(account.yearly_return);
    const { monthlyReturn, interest, endingBalance } = calculateInterest(
      startingBalance,
      yearlyReturn,
      months
    );

    // Set balance to 0
    await client.query("UPDATE accounts SET balance = 0 WHERE id = $1", [
      accountId,
    ]);

    // Record transaction
    await client.query(
      "INSERT INTO transactions(account_id, type, amount, created_at) VALUES($1, 'WITHDRAW', $2, $3)",
      [accountId, endingBalance, withdrawalDate]
    );

    await client.query("COMMIT");

    return {
      success: true,
      message: "Withdrawal successful",
      startingBalance,
      months,
      monthlyReturn,
      interest,
      endingBalance,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
