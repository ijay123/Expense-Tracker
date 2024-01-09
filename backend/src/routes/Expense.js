import express from "express";
import {
  createIncomeExpense,
  getAllIncomeExpenses,
  getIncomeExpense,
  deleteIncomeExpense,
  updateIncomeExpense,
} from "../controllers/incomeExpense/IncomeExpense.js";
import { createIncomeExpenseSchema } from "../controllers/incomeExpense/IncomeExpenseSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";
const router = express.Router();

router
  .route("/")
  .get(verifyUser, getAllIncomeExpenses)
  .post(
    validationMiddleware(createIncomeExpenseSchema),
    verifyUser,
    createIncomeExpense
  );

router
  .route("/:id")
  .get(verifyUser, getIncomeExpense)
  .patch(updateIncomeExpense)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteIncomeExpense);

export default router;
