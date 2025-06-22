import React, { useState } from "react";
import { createContext, useContext } from "react";
import { api } from "../services/api";

export const PasswordContext = createContext();

export function PasswordProvider({ children }) {
  const [passwords, setPassword] = useState([
    {
      _id: 0,
      password: "",
      username: "",
      website: "",
    },
  ]);

  //Fetch passwords
  const handleFetch = async () => {
    const response = await api.get("/api/password/fetchPasswords", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPassword(response.data.passwords);
  };

  //add password
  const handleAdd = async (password, website, username) => {
    const response = await api.post(
      "/api/password/addPassword",
      { password, website, username },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPassword((prev) => [...prev, response.data.password]);
  };

  //delete password
  const handleDelete = async (passwordId) => {
    const response = await api.delete(
      `/api/password/deletePassword/${passwordId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <PasswordContext.Provider
      value={{ passwords, handleAdd, handleDelete, handleFetch }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export const usePassword = () => {
  let content = useContext(PasswordContext);
  return content;
};
