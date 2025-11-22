import * as accountService from "../services/accountService.js";

/**
 * Account Controller - Handles HTTP requests for account endpoints
 */

export async function getAllAccounts(req, res, next) {
  try {
    const accounts = await accountService.getAllAccounts();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
}

export async function getAccountById(req, res, next) {
  try {
    const account = await accountService.getAccountById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function createAccount(req, res, next) {
  try {
    const { packet, customer_id, deposito_type_id, balance, opened_at } =
      req.body;
    const account = await accountService.createAccount(
      packet,
      customer_id,
      deposito_type_id,
      balance,
      opened_at
    );
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}

export async function updateAccount(req, res, next) {
  try {
    const { packet, customer_id, deposito_type_id, opened_at } = req.body;
    const account = await accountService.updateAccount(
      req.params.id,
      packet,
      customer_id,
      deposito_type_id,
      opened_at
    );
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function deleteAccount(req, res, next) {
  try {
    const deleted = await accountService.deleteAccount(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ message: "Account deleted" });
  } catch (error) {
    next(error);
  }
}
