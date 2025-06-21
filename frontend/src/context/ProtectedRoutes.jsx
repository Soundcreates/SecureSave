import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "./AuthContext";

function ProtectedRoutes() {
  const { user, loader } = useAuth();

  if (loader) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
