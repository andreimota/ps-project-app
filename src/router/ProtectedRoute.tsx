import React from "react";

import { ReactNode } from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";
import useAuth, {AccountType} from "./useAuth";

const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode, requiredRole: AccountType }) => {
  const token = useAuth();

  if (!token) {
    return <Navigate to="/login" replace state={{ error: "Please log in" }} />;
  }

  if(parseInt( token.accountType ) !== requiredRole) {
    return <Navigate to="/forbidden" replace state={{error: "Forbidden"}} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;