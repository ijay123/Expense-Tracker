import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_EXPENSE_CLEAR_ERROR } from "../../redux/constants/expenses";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/CustomSpinner";
import { createExpenseAction } from "../../redux/action/expenses";
import { useNavigate } from "react-router-dom";
import { getCategoriesAction } from "../../redux/action/category";

const IncomeExpense = () => {
  // const {amount} = useParams("")

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

  const [itemInput, setItemInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [items, setItems] = useState([]);
  const [itemsPrice, setItemsPrice] = useState([]);

  const addItem = () => {
    if (itemInput.trim() !== "") {
      setItems([...items, itemInput]);
      setItemInput("");
    }
    if (priceInput.trim() !== "") {
      setItemsPrice([...itemsPrice, priceInput]);
      setPriceInput("");
    }
  };
  console.log(items, itemsPrice);

  const [value, setValue] = useState({
    type: ["income", "expense"],
    amount: "",
    desc: "",
    price: "",

  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success(`successfully added${expens.type[1]}`);
      // setTimeout(() => {
      //   navigate("/incomeexpense");
      // }, 3000);
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
        amount: Number(value.amount),
        desc: items,
      })
    );
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
                value={value.amount}
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

              {/* <input
                placeholder="Add Category"
                name="category"
                value={value.category}
                onChange={handleChange}
                className="bg-white  w-[300px] h-[90px] pl-[20px] outline-none rounded-[10px] text-[30px]"
              /> */}
            </div>
          </div>
          <div>
            {/* last */}
            <div className="flex gap-[30px] items-center">
              <textarea
                rows={7}
                cols={25}
                type="text"
                id="itemInput"
                placeholder="Type an item"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                className="outline-none p-[10px]"
              />
              <input
                type="number"
                id="itemInput"
                value={Number(priceInput)}
                placeholder="Add Price"
                onChange={(e) => setPriceInput(e.target.value)}
                className="p-[10px] outline-none"
              />
            </div>

            <p>
              <button
                onClick={addItem}
                className="border p-[10px] rounded-[5px] text-[white] bg-[grey]"
              >
                Add Item
              </button>
            </p>

            <div className="flex">
              <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <ul>
                {itemsPrice.map((price, index) => (
                  <li key={index}>{price}</li>
                ))}
              </ul>
            </div>

            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
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
