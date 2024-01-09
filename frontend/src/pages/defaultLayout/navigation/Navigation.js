import React from "react";
import { NavLink } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { GiCrossMark } from "react-icons/gi";

const Navigation = () => {
  return (
    <div className="flex gap-[800px] w-[100vw] fixed text-[green] text-[18px] h-[50px] items-center px-[60px] bg-[white] p-[40px]">
      <div className="flex items-center">
        <GiCrossMark className="text-[red] text-[40px]" />
        <span className="font-[cursive] pt-[20px] text-[20px]">Tracker</span>
      </div>
      <div className="flex gap-[50px] items-center">
        <NavLink to={"/expenses"}>Expenses</NavLink>
        <NavLink to={"/incomeexpense"}>Income Expenses</NavLink>
        <NavLink to={"/"}>Signup</NavLink>
        <NavLink>
          <LuUserCircle className="text-[25px] text-[grey]" />
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
