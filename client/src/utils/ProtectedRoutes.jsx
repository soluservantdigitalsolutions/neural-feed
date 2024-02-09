// ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es";

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Render the element if authenticated
  return element;
};

export default ProtectedRoute;
