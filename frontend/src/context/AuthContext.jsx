import React, { useState, useEffect, useContext, createContext } from "react";
import { api } from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/auth/getMe", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.currentUser);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoader(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const content = useContext(AuthContext);
  return content;
};
