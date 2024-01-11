import IncomeExpense from "../../model/incomeExpense/incomeExpense.js";
import httpStatus from "http-status";
import { paginate } from "../../util/pagination.js";

export const createIncomeExpense = async (req, res) => {
  const data = req.body;

  //create the IncomeExpense

  const descExist = await IncomeExpense.findOne({
    desc: data.desc,
    userId: req.user._id,
  }).populate("user");

  if (descExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "description already exist",
    });
    return;
  }

  const incomeExpense = await IncomeExpense.create({
    amount: data.amount,
    desc: data.desc,
    type: data.type,
    totalExpense: data.totalExpense,
    price: data.price,
    userId: req.user._id,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: incomeExpense,
  });
};

export const getIncomeExpense = async (req, res) => {
  const incomeExpense = await IncomeExpense.findById(
    req.params.incomeExpenseId
  ).populate("user");
  if (!incomeExpense) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "IncomeExpense not found",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: incomeExpense,
  });
};

export const getAllIncomeExpenses = async (req, res) => {

  try {
    const model = "IncomeExpense";
    const query = { userId: req.user.id };
    const page = 1;
    const pageSize = 10;
    const populateField = ["userId"];
    const data = await paginate(model, query, page, pageSize, populateField);

    // const tasks = await taskModel
    //   .find({ userId: req.user.id })
    //   .populate("userId");

    res.status(httpStatus.OK).json({
      status: "success",
      payload: data,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }


  // const result = await IncomeExpense.find({ userId: req.user._id }).populate(
  //   "userId"
  // );

  // res.status(httpStatus.OK).json({
  //   status: "success",
  //   data: result,
  // });
};

export const updateIncomeExpense = async (req, res) => {
  const { incomeExpenseId } = req.params;
  const { amount, type, desc, totalExpense, price } = req.body;
  const exist = await IncomeExpense.findOne({ _id: incomeExpenseId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "IncomeExpense not found",
    });
    return;
  }

  const updatedIncomeExpense = await IncomeExpense.findByIdAndUpdate(
    { _id: incomeExpenseId },
    {
      amount: amount,
      type: type,
      desc: desc,
      totalExpense: totalExpense,
      price: price
    },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedIncomeExpense,
  });
};

export const deleteIncomeExpense = async (req, res) => {
  const { incomeExpenseId } = req.params;

  const exist = await IncomeExpense.findOne({ _id: incomeExpenseId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "IncomeExpense not found",
    });
    return;
  }

  await IncomeExpense.findByIdAndDelete({ _id: incomeExpenseId });

  res.status(httpStatus.OK).json({
    status: "success",
    data: "IncomeExpense deleted",
  });
};
