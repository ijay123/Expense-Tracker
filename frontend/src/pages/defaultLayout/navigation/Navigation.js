import React from "react";
import { NavLink } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";


const Navigation = () => {
  return (
    <div className="flex justify-between w-[100vw] border fixed text-[green] text-[18px] h-[50px] items-center px-[100px] bg-[white] p-[40px]">
      <div className="flex items-center">
        <img src="/img/calculator.png" alt="" className="w-[40px]"/> <i>Xtracker</i>
      </div>
      <div className="flex gap-[50px] items-center">
        <NavLink to={"/expenses"}>Expenses</NavLink>
        <NavLink to={"/incomeexpense"}>Income Expenses</NavLink>
        <NavLink to={'/listedexpense'}>All Expenses</NavLink>
        <NavLink to={"/"}>Signup</NavLink>
        <NavLink>
          <LuUserCircle className="text-[25px] text-[grey]" />
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
