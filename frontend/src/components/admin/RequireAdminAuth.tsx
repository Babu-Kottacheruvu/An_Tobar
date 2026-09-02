import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticated } from "./adminAuth";

/**
 * A client-side-only session gate for the admin area. This is a UI
 * prototype with no backend, so it demonstrates the authenticated-route
 * pattern rather than providing real security.
 */
export function RequireAdminAuth() {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
