import React, { useEffect } from "react";

import { getExpensesAction } from "../../redux/action/expenses";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/CustomSpinner";



const ListedExpenses = () => {
  // const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
  //   ? JSON.parse(localStorage.getItem("expenseUserInfo"))
  //   : null;

  const dispatch = useDispatch();
  const {
    allExpenses: { expenses, loading },
  
  } = useSelector((state) => state);



  console.log(expenses, "expenses");

  useEffect(() => {
    dispatch(getExpensesAction());
 
  }, [dispatch]);

  return (
    <div className="pt-[150px] sm:pt-[200px]">
      <p className="flex justify-center text-[30px] sm:text-[40px] mb-[40px] text-[green]">All Expenses</p>
      <div className="sm:text-[25px] text-[green] border  sm:w-[80%] m-auto">
        {loading ? (
          <Spinner />
        ) : (
          <div className="p-[20px] gap-[30px] sm:overflow-hidden sm:flex-col flex overflow-x-auto">
            {expenses &&
               expenses.map((expense) => (
                  <div key={expense._id} className="flex flex-wrap p-[20px] sm:p-[40px] gap-[10px] sm:gap-[20px] bg-[#b8b5b5]">
                     <p><span className="text-[#6c2b2b]">Category:</span> {expense.categoryId}</p>
                    <p><span className="text-[#6c2b2b]">Income:</span> {expense.amount}</p>
                    <p><span className="text-[#6c2b2b]">Description:</span>{expense.desc}</p>
                    <p><span className="text-[#6c2b2b]">Price:</span> {expense.price}</p>
                    <p><span className="text-[#6c2b2b]">Total Income:</span> {expense.totalExpense}</p>
                    
                  </div>
                ))
              }
          </div>
        )}
      </div>
    </div>
  );
};

export default ListedExpenses;
