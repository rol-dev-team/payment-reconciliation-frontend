import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../features/auth/context/auth";

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
