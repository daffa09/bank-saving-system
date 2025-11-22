import express from "express";
import * as accountController from "../controllers/accountController.js";
import { validateRequired } from "../middleware/validation.js";

const router = express.Router();

router.get("/", accountController.getAllAccounts);
router.get("/:id", accountController.getAccountById);
router.post(
  "/",
  validateRequired(["packet", "customer_id", "deposito_type_id"]),
  accountController.createAccount
);
router.put(
  "/:id",
  validateRequired(["packet", "customer_id", "deposito_type_id"]),
  accountController.updateAccount
);
router.delete("/:id", accountController.deleteAccount);

export default router;
