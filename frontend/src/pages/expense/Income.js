import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_EXPENSE_CLEAR_ERROR,
  CREATE_EXPENSE_RESET,
} from "../../redux/constants/expenses";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/CustomSpinner";
import { createExpenseAction } from "../../redux/action/expenses";
import { useNavigate } from "react-router-dom";

const Income = () => {

  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
  ? JSON.parse(localStorage.getItem("expenseUserInfo"))
  : null;

  const dispatch = useDispatch();
  const {
    expenses: { error, expens, success, loading },
  } = useSelector((state) => state);

  const [value, setValue] = useState({
    type: ["income", "expense"],
    amount: "",
    userId:  userInfoFromLocalStorage?.data?._id
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success(`successfully added${expens.type[0]}`);
      dispatch({ type: CREATE_EXPENSE_RESET });
      setTimeout(() => {
        navigate("/incomeexpense");
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_EXPENSE_CLEAR_ERROR);
      }, 3000);
    }
    
  }, [success, error, dispatch, expens, navigate]);

  async function incomeHandler() {
    dispatch(
      createExpenseAction({ type: value.type[0], amount: Number(value.amount), userId: value.userId })
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center text-center  mt-[250px] ">
        <input
          type="text"
          placeholder="Please, input value for Income"
          name="amount"
          className="border w-[500px] h-[60px] rounded-[10px] outline-green-700 pl-[15px]"
        />

        {loading ? (
          <Spinner />
        ) : (
          <Link to={`/incomeexpense`}>
            <button
              onClick={incomeHandler}
              className="border px-[30px] py-[10px] ml-[30px] rounded-[10px] bg-[green] text-white"
            >
              Enter
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Income;
