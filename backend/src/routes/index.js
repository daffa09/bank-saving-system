import express from "express";
import customerRoutes from "./customerRoutes.js";
import depositoTypeRoutes from "./depositoTypeRoutes.js";
import accountRoutes from "./accountRoutes.js";
import transactionRoutes from "./transactionRoutes.js";

const router = express.Router();

// Mount all routes
router.use("/customers", customerRoutes);
router.use("/deposito-types", depositoTypeRoutes);
router.use("/accounts", accountRoutes);
router.use("/accounts", transactionRoutes); // Transactions are nested under accounts

export default router;
