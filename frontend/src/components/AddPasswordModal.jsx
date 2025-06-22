import React, { useState } from "react";

import { usePassword } from "../context/passwordContext";

function AddPasswordModal({ setOpenForm }) {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });

  const { handleAdd } = usePassword();

  function handleSubmit(e) {
    e.preventDefault();
    handleAdd(formData.password, formData.website, formData.username);
    setOpenForm(false);
  }

  function handleClose() {
    setFormData({ website: "", username: "", password: "" });
    setOpenForm(false);
  }

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[40%] bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col gap-4 animate-fade-in-up"
      >
        <h2 className="text-2xl font-bold text-[#06923E]">Add New Password</h2>

        <div className="flex flex-col gap-2">
          <label className="text-[#06923E] font-semibold">Website</label>
          <input
            type="text"
            placeholder="e.g. Netflix, Instagram..."
            className="p-2 rounded-lg bg-gray-100 outline-none"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#06923E] font-semibold">
            Username / Email
          </label>
          <input
            type="text"
            placeholder="Enter your username or email"
            className="p-2 rounded-lg bg-gray-100 outline-none"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#06923E] font-semibold">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="p-2 rounded-lg bg-gray-100 outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        {/* Button Row */}
        <div className="flex justify-end mt-4 gap-3">
          <button
            type="button"
            className="text-gray-600 cursor-pointer hover:underline transition-all duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#06923E] hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition-all duration-300 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPasswordModal;
