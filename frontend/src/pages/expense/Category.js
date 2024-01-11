import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/CustomSpinner";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY_CLEAR_ERROR,
  CREATE_CATEGORY_RESET,
} from "../../redux/constants/category";
import { createCategoryAction } from "../../redux/action/category";

import { useNavigate } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const {
    categories: { error, name, success, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
    ? JSON.parse(localStorage.getItem("expenseUserInfo"))
    : null;

  const [value, setValue] = useState({
    name: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  const handleChange = (event) => {
    setValue({ ...value, name: event.target?.value });
    console.log(event.target?.value);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success(`successfully added category ${name.name}`);
      navigate('/incomeexpense') 
      dispatch({ type: CREATE_CATEGORY_RESET });
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_CATEGORY_CLEAR_ERROR);
      }, 3000);
    }
  }, [success, error, dispatch, name, navigate]);

  async function categoryHandler() {
    dispatch(createCategoryAction(value));
   
  }

  console.log(value);

  return (
    <div>
      <div className="border w-[300px] px-[40px] py-[20px] rounded-[10px]">
        <p className="text-[30px] mb-[40px] text-green-600">Enter Category</p>
        <p>
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={value.name}
            className="mb-[20px] border p-[10px] text-[20px] rounded-[10px] outline-none"
          />
        </p>
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={categoryHandler}
            className=" p-[10px] bg-[green] text-white rounded-[8px]"
          >
            Add Category
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;
