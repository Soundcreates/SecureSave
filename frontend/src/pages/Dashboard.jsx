import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import AddPasswordModal from "../components/AddPasswordModal";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#D3ECCD] to-white font-Playfair">
      {/* Sidebar */}
      <SideBar setOpenForm={setOpenForm} />
      {/* Main content */}
      <main className="flex-1 p-8">
        {openForm && <AddPasswordModal setOpenForm={setOpenForm} />}
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#06923E] animate-fade-in-down">
              Dashboard
            </h1>
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{user?.username}</span>
            </p>
          </div>
        </div>

        {/* Vault Section */}
        <section className="bg-white shadow-2xl rounded-2xl p-6 transition-all duration-300 hover:shadow-green-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            🔐 Your Saved Passwords
          </h2>

          {/* Password Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample password card */}
            <Card website="netflix" password="******" username="shantanav" />
            {/* ⬆️ Repeat this card dynamically with map() */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
