import Joi from "joi";

export const createIncomeExpenseSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  desc: Joi.string(),
  totalExpense: Joi.number(),
  price: Joi.number(),
  userId: Joi.string(),
  categoryId: Joi.string(),
});
