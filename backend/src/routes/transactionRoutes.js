import express from "express";
import * as transactionController from "../controllers/transactionController.js";
import { validateRequired, validatePositive } from "../middleware/validation.js";

const router = express.Router();

// Deposit to account
router.post(
  "/:id/deposit",
  validateRequired(["amount"]),
  validatePositive(["amount"]),
  transactionController.deposit
);

// Withdraw from account
router.post(
  "/:id/withdraw",
  validateRequired(["withdrawal_date"]),
  transactionController.withdraw
);

export default router;
