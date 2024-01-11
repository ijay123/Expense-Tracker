import React, { useEffect, useState } from "react";
// import Income from "./Income";
import Category from "./Category";



const Expense = () => {

 

  // const [value, setValue] = useState({
  //   type: ["income", "expense"],
  //   user: "",
  // });



  // const [incomeExpense, setIncomeExpense] = useState("SelectType");

  // const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(false);

  // const handleChange = (event) => {
  //   setIncomeExpense(event.target.value);
  // };

  // const renderResult = () => {
  //   let result;
  //   incomeExpense === "SelectType"
  //     ? (result = "Select Type")
  //     : (result = incomeExpense);
  //   return result;
  // };

  // useEffect(() => {
  //   incomeExpense === "income" ? setIncome(true) : setIncome(false);
  //   incomeExpense === "expense" ? setExpense(true) : setExpense(false);

  // }, [incomeExpense]);

 
  return (
    <>
      <div className="pt-[70px] text-[40px] mb-[50px] items-center justify-center flex text-green-800">
        Expense Tracker
      </div>

      <div className="flex justify-center gap-[150px]">
   {/* category */}

       <Category/>

</div>

{/* income */}
        {/* <div className="border w-[280px] pl-[10px] pb-[20px] rounded-[10px]">
        <p className="text-[20px] pb-[30px] pt-[20px] text-green-600">TYPE</p>

        <select
          className=" p-[10px] text-[18px] rounded-[10px] bg-[green] text-white outline-none"
          value={incomeExpense}
          onChange={handleChange}
        >
          <option value="SelectType">Select Type</option>
          <option value={value.type[0]}>Income</option>
          <option value={value.type[1]}>Expense</option>
        </select>

        <button
          className="border px-[30px] py-[10px] ml-[30px] rounded-[10px] bg-[green] text-white"
          onClick={()=>renderResult}
        >
          Enter
        </button>
      </div>
      </div> */}

      {/* <div className="">{income && <Income />}</div> */}
      {/* <div>{expense && navigate("/incomeexpense")}</div> */}
    </>
  );
};

export default Expense;
