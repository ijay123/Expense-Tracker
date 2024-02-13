import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";

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
      <div className="flex sm:hidden">Menu</div>
      <nav className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo or Brand name */}
              <div>
                <a
                  href="/"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="font-bold">Brand Name</span>
                </a>
              </div>

              {/* Primary nav */}
              <div className="hidden md:flex items-center space-x-1">
                <a href="/" className="py-5 px-3 hover:text-gray-400">
                  Home
                </a>
                <a href="/" className="py-5 px-3 hover:text-gray-400">
                  About
                </a>
                <a href="/" className="py-5 px-3 hover:text-gray-400">
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-button"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-700">
            Home
          </a>
          <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-700">
            About
          </a>
          <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-700">
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
