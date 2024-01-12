import Joi from "joi";

export const createIncomeExpenseSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  desc: Joi.array(),
  totalExpense: Joi.number(),
  price: Joi.array(),
  userId: Joi.string(),
  
});
