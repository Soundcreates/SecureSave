import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
}

export default ProtectedRoutes;
