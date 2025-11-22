import express from "express";
import * as depositoTypeController from "../controllers/depositoTypeController.js";
import { validateRequired } from "../middleware/validation.js";

const router = express.Router();

router.get("/", depositoTypeController.getAllDepositoTypes);
router.get("/:id", depositoTypeController.getDepositoTypeById);
router.post(
  "/",
  validateRequired(["name", "yearly_return"]),
  depositoTypeController.createDepositoType
);
router.put(
  "/:id",
  validateRequired(["name", "yearly_return"]),
  depositoTypeController.updateDepositoType
);
router.delete("/:id", depositoTypeController.deleteDepositoType);

export default router;
