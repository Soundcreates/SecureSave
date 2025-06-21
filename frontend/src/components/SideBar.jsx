import React from "react";
import { useNavigate, Link } from "react-router";

function SideBar({ setOpenForm }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  function handleOpenForm() {
    setOpenForm(true);
  }
  return (
    <div>
      <aside className="w-64 bg-[#06923E] h-screen text-white p-6 hidden md:flex flex-col justify-between shadow-xl">
        <div>
          <h2 className="text-3xl font-extrabold mb-6 tracking-wide">
            SecureSave
          </h2>
          <nav className="flex flex-col gap-4 text-lg">
            <Link
              to="/dashboard"
              className="hover:text-[#D3ECCD] transition-all duration-200 cursor-pointer text-left"
            >
              📁 My Vault
            </Link>
            <button
              onClick={handleOpenForm}
              className="hover:text-[#D3ECCD] transition-all duration-200 cursor-pointer text-left"
            >
              ➕ Add Password
            </button>
            <button className="hover:text-[#D3ECCD] transition-all duration-200 cursor-pointer text-left">
              ⚙️ Settings
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-600 transition-all duration-200 px-4 py-2 rounded-md shadow cursor-pointer text-white font-semibold"
        >
          Logout
        </button>
      </aside>
    </div>
  );
}

export default SideBar;
