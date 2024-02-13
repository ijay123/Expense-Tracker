import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { CiMenuBurger } from "react-icons/ci";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
    ? JSON.parse(localStorage.getItem("expenseUserInfo"))
    : null;

  return (
    <div className="flex justify-between w-[100%] sm:w-[100vw] border fixed text-[green] text-[18px] h-[50px] items-center sm:px-[100px] bg-[white] py-[40px] px-[20px] sm:p-[40px]">
      <div className="flex items-center">
        <img src="/img/calculator.png" alt="" className="w-[40px]" />{" "}
        <i>Xtracker</i>
      </div>
      <div className="hidden gap-[50px] items-center sm:flex">
        <NavLink to={"/expenses"}>Expenses</NavLink>
        <NavLink to={"/incomeexpense"}>Income Expenses</NavLink>
        <NavLink to={"/listedexpense"}>All Expenses</NavLink>
        <NavLink to={"/"}>Signup</NavLink>
        <NavLink>
          {userInfoFromLocalStorage?.data?.avatar ? (
            <img
              src={userInfoFromLocalStorage?.data?.avatar}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <LuUserCircle size="30" />
          )}
        </NavLink>
      </div>
   <div className="flex sm:hidden"><CiMenuBurger onClick={()=>setIsOpen(!isOpen)} /></div>
   
{isOpen && 

<div className="bg-[#363434] sm:hidden flex flex-col gap-[30px] absolute top-[80px] p-[20px] right-0">
<NavLink to={"/expenses"}>Expenses</NavLink>
     <NavLink to={"/incomeexpense"}>Income Expenses</NavLink>
     <NavLink to={"/listedexpense"}>All Expenses</NavLink>
     <NavLink to={"/"}>Signup</NavLink>
     <NavLink>
       {userInfoFromLocalStorage?.data?.avatar ? (
         <div className="flex gap-[10px]">
          <img
           src={userInfoFromLocalStorage?.data?.avatar}
           alt="User Profile"
           className="w-8 h-8 rounded-full"
         /> <span>My Account</span>
         </div>
        
       ) : (
         <LuUserCircle size="30" />
       )}
     </NavLink>
</div>
}


    </div>
  );
};

export default Navigation;
