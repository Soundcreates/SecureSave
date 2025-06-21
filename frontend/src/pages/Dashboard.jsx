import React from "react";
import { useEffect } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Dashboard() {
  const { user, loader } = useContext(AuthContext);

  if (loader) return <div>...Loading</div>;
  if (!user) return <div>No user found, log in please</div>;
  return <div>{user.username}</div>;
}

export default Dashboard;
