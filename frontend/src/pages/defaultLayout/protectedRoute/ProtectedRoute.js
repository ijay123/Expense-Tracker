import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.loggedInUser);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Layout children={children}></Layout>
};
