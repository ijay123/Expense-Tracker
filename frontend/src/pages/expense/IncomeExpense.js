import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_EXPENSE_CLEAR_ERROR,
  CREATE_EXPENSE_RESET,
} from "../../redux/constants/expenses";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/CustomSpinner";
import { createExpenseAction } from "../../redux/action/expenses";

import { getCategoriesAction } from "../../redux/action/category";

const IncomeExpense = () => {
  // const {amount} = useParams("")
  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
    ? JSON.parse(localStorage.getItem("expenseUserInfo"))
    : null;
const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    expenses: { error, expens, success, loading },
    AllCategories: { name: cat },
  } = useSelector((state) => state);

  const [value, setValue] = useState({
    type: ["income", "expense"],
    desc: "",
    price: "",
    amount: "",
    totalExpense: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  const handleChange = (event) => {
    setValue({ ...value, name: event.target?.value });
    console.log(event.target?.value);
  };

  

  useEffect(() => {
    if (success) {
      toast.success(`successfully added${expens.type[1]}`);
      dispatch({ type: CREATE_EXPENSE_RESET });
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_EXPENSE_CLEAR_ERROR);
      }, 3000);
    }

    dispatch(getCategoriesAction());
  }, [success, error, dispatch, expens]);

  console.log(cat);

  async function expenseHandler() {
    dispatch(
      createExpenseAction({
        type: value.type[0],
        desc: value.desc,
        price: Number(value.price),
        amount: Number(value.amount),
        totalExpense: Number(value.amount - value.price),
        userId: value.userId,
      })
     
    );
    navigate('/listedexpense')
  }
  return (
    <div className="pt-[150px] bg-green-700 h-[100vh]">
      <form>
        <h2 className="text-center text-4xl font-bold mb-[100px] text-white">
          Add Expense
        </h2>
        <div className="flex gap-[300px]">
          <div className="flex-col ml-[200px]">
            <div>
              <input
                placeholder="Add income"
                name="amount"
                onChange={handleChange}
                className="bg-white w-[300px] h-[90px] mb-[80px] pl-[20px] outline-none rounded-[10px] text-[30px]"
              />
            </div>

            <div>
              <select>
                {cat
                  ? cat.map((category, id) => (
                      <option key={id}>{category.name}</option>
                    ))
                  : ""}
              </select>

            
            </div>
          </div>
          <div>
            {/* last */}
            
            <div className="flex gap-[30px] items-center">
              <textarea
                rows={7}
                cols={25}
                type="text"
                name="desc"
                placeholder="Type an item"
                onChange={handleChange}
                className="outline-none p-[10px]"
              />
              <input
                type="number"
                placeholder="Add Price"
                onChange={handleChange}
                name="price"
                className="p-[10px] outline-none"
              />
            </div>

            <input
              type="number"
              name="totalPrice"
              placeholder="total Price"
              value={value.totalExpense}
              onChange={handleChange}
              className="p-[10px] outline-none"
            />

            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={expenseHandler}
                className="w-[200px] h-[40px] bg-[orange] rounded-[5px] text-white mt-[100px] ml-[100px] outline-none"
              >
                Add to Expenses
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncomeExpense;
