import mongoose from "mongoose";
const incomeExpenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: [true, "amount is required"] },
    type: { type: String, enum: ["income", "expense"] },
    desc: { type: String },
    totalExpense: {type: Number},
    price: {type: Number},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const IncomeExpense = mongoose.model("IncomeExpense", incomeExpenseSchema);

export default IncomeExpense;


