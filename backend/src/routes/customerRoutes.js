import express from "express";
import * as customerController from "../controllers/customerController.js";
import { validateRequired } from "../middleware/validation.js";

const router = express.Router();

router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.post(
  "/",
  validateRequired(["name"]),
  customerController.createCustomer
);
router.put("/:id", validateRequired(["name"]), customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;
