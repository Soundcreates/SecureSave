import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./context/ProtectedRoutes";
import SideBar from "./components/SideBar";
import AddPasswordModal from "./components/AddPasswordModal";
import { PasswordProvider } from "./context/passwordContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PasswordProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </PasswordProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
