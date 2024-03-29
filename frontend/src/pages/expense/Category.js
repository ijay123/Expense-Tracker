import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/CustomSpinner";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY_CLEAR_ERROR,
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
} from "../../redux/constants/category";
import {
  createCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "../../redux/action/category";

import { useNavigate } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const {
    categories: { error, name, success, loading },
    AllCategories: { name: cat },
    updatedCategory: { success: updateSuccess, loading: loadingDelete },
    deletedCategory: { success: deleteSuccess, loading: loadingUpdate },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
    ? JSON.parse(localStorage.getItem("expenseUserInfo"))
    : null;
  console.log(cat, "cat");

  const [value, setValue] = useState({
    name: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  const [editCategory, setEditCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openEditCategory, setOpenEditCategory] = useState(false);

  const handleChange = (event) => {
    setValue({ ...value, name: event.target?.value });
    console.log(event.target?.value);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success(`successfully added category ${name.name}`);
      setTimeout(() => {
        navigate("/incomeexpense");
      }, 3000);
      dispatch({ type: CREATE_CATEGORY_RESET });
    }

    if (updateSuccess) {
      toast.success("Category updated successfully");
      //reset
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch(getCategoriesAction());
      setCategoryId("");
      setOpenEditCategory(false);
      setEditCategory("");
    }
    if (deleteSuccess) {
      toast.success("Delete Successful!");
      dispatch({ type: DELETE_CATEGORY_RESET });
      dispatch(getCategoriesAction());
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_CATEGORY_CLEAR_ERROR);
      }, 3000);
    }

    dispatch(getCategoriesAction());
  }, [success, error, dispatch, name, navigate, deleteSuccess, updateSuccess]);

  async function categoryHandler() {
    dispatch(createCategoryAction(value));
  }

  async function updateHandler(id) {
    dispatch(updateCategoryAction(id, editCategory));
  }
  async function deleteHandler(id) {
    setCategoryId(id);
    dispatch(deleteCategoryAction(id));
  }

  const toggleEditHandler = (id) => {
    setCategoryId(id);
    setOpenEditCategory(true);
  };

  const canceUpdateHandler = () => {
    setCategoryId("");
    setOpenEditCategory(false);
    setEditCategory("");
  };

  console.log(value);

  return (
    <div className="flex flex-col gap-[50px] border-[5px] w-[90vw] border-green-900 p-[30px] bg-[grey] sm:flex-row items-center sm:items-start sm:justify-between  sm:w-[60%]">
      <div className="border-[5px] flex flex-col w-[70vw] sm:w-[300px] h-[300px] px-[10px] sm:px-[40px] py-[20px] rounded-[10px] bg-[#e8e7e7]">
        <p className="text-[20px] sm:text-[30px] mb-[40px] text-green-600">
          Enter Category
        </p>

        <p>
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={value.name}
            className="mb-[20px] border p-[10px] w-[100%] text-[20px] rounded-[10px] outline-none"
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
      <div className="rounded-[10px] px-[10px] sm:px-[30px] py-[20px] text-[25px] bg-[#e8e7e7] transition-all">
        <p className="mb-[40px] text-[green]">All Categories</p>
        {cat
          ? cat.map((catList, id) => (
              <ul key={id} className="list-disc text-[20px] px-[9px]">
                <li className="mb-[30px]">
                  {catList.name}
                  {openEditCategory && categoryId === catList._id && (
                    <div>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      />
                      {loadingUpdate ? (
                        <Spinner />
                      ) : (
                        <button
                          className="bg-[green] rounded-[5px] p-[2px] text-white"
                          onClick={() => updateHandler(catList._id)}
                        >
                          Save
                        </button>
                      )}

                      <button
                        className="bg-[red] ml-[10px] rounded-[5px] p-[2px] text-white"
                        onClick={() => canceUpdateHandler()}
                      >
                        cancel
                      </button>
                    </div>
                  )}
                  <div className="flex">
                    {!openEditCategory && (
                      <button
                        onClick={() => toggleEditHandler(catList._id)}
                        className=" p-[4px] bg-[green] text-white rounded-[4px] text-[18px] ml-[40px] mr-[10px]"
                      >
                        Update
                      </button>
                    )}
                    {loadingDelete && categoryId === catList._id ? (
                      <Spinner />
                    ) : (
                      <button
                        onClick={() => deleteHandler(catList._id)}
                        className=" p-[4px] bg-[green] text-white rounded-[4px] text-[18px]"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Category;
