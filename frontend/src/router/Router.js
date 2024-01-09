import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/defaultLayout/layout/Layout";
import RegisterScreen from "../screens/registerScreen/RegisterScreen";
import LoginScreen from "../screens/loginScreen/LoginScreen";
import { ProtectedRoute } from "../pages/defaultLayout/protectedRoute/ProtectedRoute";
import Expense from "../pages/expense/Expense";
import NotFound from "../pages/defaultLayout/not_found/NotFound";
import IncomeExpense from "../pages/expense/IncomeExpense";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />

      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incomeexpense"
        element={
          <Layout>
            <IncomeExpense />
          </Layout>
        }
      />
       
     

      <Route
        path="/notFound"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={"/notFound"} />} />
    </Routes>
  );
};

export default Router;
