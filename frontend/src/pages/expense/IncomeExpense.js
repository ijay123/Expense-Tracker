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
  const navigate = useNavigate();
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
    categoryId: "",

    userId: userInfoFromLocalStorage?.data?._id,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (success) {
      toast.success(`successfully added${expens.type[1]}`);
      dispatch({ type: CREATE_EXPENSE_RESET });
      setTimeout(() => {
        navigate("/listedexpense");
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_EXPENSE_CLEAR_ERROR);
      }, 3000);
    }

    dispatch(getCategoriesAction());
  }, [success, error, dispatch, expens, navigate]);

  console.log(cat);

  async function expenseHandler() {
    dispatch(
      createExpenseAction({
        type: value.type[0],
        desc: value.desc,
        price: Number(value.price),
        amount: Number(value.amount),
        categoryId: value.categoryId,
        totalExpense: Number(value.amount - value.price),
        userId: value.userId,
      })
    );
    // navigate('/listedexpense')
  }
  return (
    <div className="pt-[150px] bg-green-700 sm:h-[100vh]">
      <form>
        <h2 className="text-center text-4xl font-bold mb-[100px] text-white">
          Add Expense
        </h2>
        <div className="flex sm:flex-row flex-col sm:gap-[200px]">
          <div className="flex justify-center gap-[10px] sm:flex-col sm:ml-[200px]">
            <div>
              <input
                placeholder="Add income"
                name="amount"
                onChange={handleChange}
                className="bg-white sm:w-[300px] w-[40vw] h-[50px] mb-[80px] pl-[20px] outline-none rounded-[10px] sm:text-[30px]"
              />
            </div>

            <div>
              <select
                onChange={handleChange}
                value={value.categoryId}
                name="categoryId"
                className="sm:w-[200px] w-[50vw] h-[50px] rounded-[10px] outline-none"
              >
                <option>Select Category</option>
                {cat &&
                  cat.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            {/* last */}

            <div className="flex sm:gap-[30px] gap-[10px] items-center border-[5px] border-[#6d2a2a] bg-[#566156] p-[20px] sm:p-[40px]">
              <textarea
                rows={5}
                cols={20}
                type="text"
                name="desc"
                placeholder="Add an item"
                onChange={handleChange}
                className="outline-none p-[10px]"
              />
              <input
                type="number"
                placeholder="Add Price"
                onChange={handleChange}
                name="price"
                className="w-[40vw] sm:w-[200px]  p-[10px] outline-none"
              />
            </div>

       
<br/>
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={expenseHandler}
                className="w-[200px] h-[40px] flex justify-center items-center m-auto  bg-[grey] rounded-[5px] text-white sm:mt-[100px] sm:ml-[100px] mb-[50px] outline-none"
              >
                Add Expense
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncomeExpense;
