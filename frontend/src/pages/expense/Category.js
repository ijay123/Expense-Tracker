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
  deleteCategoryAction
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
    console.log(cat, "cat")

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
      //reset
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch(getCategoriesAction());
      setCategoryId("");
      setOpenEditCategory(false);
      setEditCategory("");
    }
    if (deleteSuccess) {
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
  }, [success, error, dispatch, name, navigate, deleteSuccess,updateSuccess]);

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
    <div className="flex gap-[200px]">
      <div className="border w-[300px] h-[300px] px-[40px] py-[20px] rounded-[10px]">
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
      <div className="border px-[30px] py-[20px] text-[25px]">
      {cat
          ? cat.map((catList, id) => (
              <ul key={id} className="list-disc text-[20px]">
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
                        <Spinner/>
                      ) : (
                        <button onClick={() => updateHandler(catList._id)}>
                          Save
                        </button>
                      )}

                      <button onClick={() => canceUpdateHandler()}>
                        cancel
                      </button>
                    </div>
                  )}

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
                </li>
              </ul>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Category;
