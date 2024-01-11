// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// const ListedExpenses = () => {

//   const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
//     ? JSON.parse(localStorage.getItem("expenseUserInfo"))
//     : null;

//   const dispatch = useDispatch();
//   const {
//     expenses: { error, expens, success, loading },
//     AllCategories: {
//       error: catError,
//       name: cat,
//       success: catSuccess,
//       loading: catLoading,
//     },
//   } = useSelector((state) => state);

//   useEffect(() => {
//     if (success) {
//       toast.success(`successfully added${expens.type[1]}`);
//       dispatch({ type: CREATE_EXPENSE_RESET });
//     }

//     if (error) {
//       toast.error(`${error}`);
//       setTimeout(() => {
//         dispatch(CREATE_EXPENSE_CLEAR_ERROR);
//       }, 3000);
//     }

//     dispatch(getCategoriesAction());
//   }, [success, error, dispatch, expens]);


//   return (
//     <div>

//     </div>
//   )
// }

// export default ListedExpenses