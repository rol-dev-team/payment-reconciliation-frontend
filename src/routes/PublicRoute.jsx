import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../features/auth/context/auth";

export default function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}
