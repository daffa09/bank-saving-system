import * as transactionService from "../services/transactionService.js";

/**
 * Transaction Controller - Handles deposit and withdraw operations
 */

export async function deposit(req, res, next) {
  try {
    const { amount, deposit_date } = req.body;
    const result = await transactionService.depositToAccount(
      req.params.id,
      amount,
      deposit_date
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function withdraw(req, res, next) {
  try {
    const { withdrawal_date } = req.body;
    const result = await transactionService.withdrawFromAccount(
      req.params.id,
      withdrawal_date
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}
