import React from "react";
// import Income from "./Income";
import Category from "./Category";

const Expense = () => {
  return (
    <div className="bg-[#cbc9c9]  sm:h-[100vh]">
      <div className="pt-[150px] text-[30px] sm:text-[40px] mb-[50px] items-center justify-center flex text-green-800">
        Expense Tracker
      </div>

      <div className="flex justify-center gap-[150px]">
        {/* category */}

        <Category />
      </div>
    </div>
  );
};

export default Expense;
