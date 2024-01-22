import React, { useState, useEffect } from "react";

import { getExpensesAction } from "../../redux/action/expenses";
import { useDispatch, useSelector } from "react-redux";

const ListedExpenses = () => {
  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
    ? JSON.parse(localStorage.getItem("expenseUserInfo"))
    : null;

  const dispatch = useDispatch();
  const {
    allExpenses: { expenses },
  } = useSelector((state) => state);

console.log(expenses, 'expenses')

  useEffect(() => {
    // if (success) {
    //   toast.success(`successfully added${expens.type[1]}`);
    //   dispatch({ type: CREATE_EXPENSE_RESET });
    // }

    // if (error) {
    //   toast.error(`${error}`);
    //   setTimeout(() => {
    //     dispatch(CREATE_EXPENSE_CLEAR_ERROR);
    //   }, 3000);
    // }
    dispatch(getExpensesAction());
  }, [dispatch]);

  return (
    <div>
      <div>
        {expenses
          ? expenses.map((expense, id) => (
              <div key={id}>
                <p>{expense.amount}</p>
                <p>{expense.type}</p>
                <p>{expense.desc}</p>
                <p>{expense.price}</p>
                <p>{expense.totalExpense}</p>
               
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ListedExpenses;
