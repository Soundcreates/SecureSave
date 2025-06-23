import React from "react";
import { usePassword } from "../context/passwordContext";

function Card({ id, website, password, username }) {
  const { handleDelete } = usePassword();

  const handleClick = async () => {
    await handleDelete(id);
    console.log("deleted");
  };

  return (
    <div className="bg-[#D3ECCD] p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
      <h3 className="text-xl font-bold mb-1">{website}</h3>
      <p className="text-sm text-gray-700">Username: {username}</p>
      <p className="text-sm text-gray-700">Password: {password}</p>
      <button
        onClick={handleClick}
        className="mt-3 text-red-600 font-semibold hover:underline cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}

export default Card;
