import React, {useState, useEffect} from 'react'
import { getCategoryAction } from '../../redux/action/category';
import { getExpensesAction } from '../../redux/action/expenses';
import { useDispatch, useSelector } from 'react-redux';

const ListedExpenses = () => {

  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
    ? JSON.parse(localStorage.getItem("expenseUserInfo"))
    : null;

  const dispatch = useDispatch();
  const {
    expenses: { error, expens, success, loading },
    AllCategories: {
      error: catError,
      name: cat,
      success: catSuccess,
      loading: catLoading,
    },
  } = useSelector((state) => state);

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

    dispatch(getCategoryAction());
    dispatch(getExpensesAction());
  }, [dispatch]);

  return (
    <div>

{cat.map((category, id)=>(
  <div key={id}>
    <p>{category.name}</p>
  </div>
))}

      {expens.map((expense, id)=>(
        <div key={id}>
          <p>{expense.amount}</p>
          <p>{expense.type}</p>
          <p>{expense.desc}</p>
          <p>{expense.price}</p>
          <p>{expense.total}</p>
        </div>
      ))}
    </div>
  )
}

export default ListedExpenses
