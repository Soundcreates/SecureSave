import React, { useState } from "react";
import { CircleUserRound, Mail, RectangleEllipsis } from "lucide-react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const sendData = async () => {
      try {
        const response = await api.post("/api/auth/register", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setError(response.data.message);
          const token = response.data.token;
          localStorage.setItem("token", token);
          console.log("local storage applied, and token is: ", token);
          navigate("/dashboard");
        } else if (response.status === 400) {
          setError(response.data.message);
          setFormData({
            username: "",
            email: "",
            password: "",
          });
        } else if (response.status === 401) {
          setError(response.data.message);
        }
      } catch (err) {
        console.error(err.message);
        setError("Something went wrong. Please try again.");
      }
    };

    sendData();
  }

  return (
    <div className="w-full h-screen flex justify-center items-center font-Playfair bg-white">
      <div className="flex flex-col bg-white gap-5 rounded-xl transition-all duration-300 w-[60%] h-[70%]">
        <div className="flex justify-center items-center py-5">
          <h1 className="text-5xl font-semibold text-black">
            Welcome to <br />
            <span className="text-[#06923E] font-bold">Secure Save</span>
          </h1>
        </div>
        <div className="w-full h-full flex justify-center items-start p-5">
          <form
            onSubmit={handleSubmit}
            className="shadow-2xl p-5 w-[60%] h-full rounded-lg bg-[#D3ECCD] flex flex-col justify-center items-center gap-2"
          >
            <div className="flex flex-col gap-2 w-[60%] relative">
              <label
                htmlFor="username"
                className="text-2xl font-semibold text-[#06923E]"
              >
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="relative w-full h-[40px] px-8 rounded-lg outline-none bg-gray-300"
              />
              <div className="absolute top-[47px] px-[2px]">
                <CircleUserRound color="#264b26" strokeWidth={2} />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[60%] relative">
              <label
                htmlFor="email"
                className="text-2xl font-semibold text-[#06923E]"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="relative w-full h-[40px] px-8 rounded-lg outline-none bg-gray-300"
              />
              <div className="absolute top-[47px] px-[2px]">
                <Mail color="#264b26" />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[60%] relative">
              <label
                htmlFor="password"
                className="text-2xl font-semibold text-[#06923E]"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="relative w-full h-[40px] px-8 rounded-lg outline-none bg-gray-300"
              />
              <div className="absolute top-[47px] px-[2px]">
                <RectangleEllipsis color="#264b26" />
              </div>
            </div>

            <p className="text-gray-600 text-md italic">{error}</p>

            <div className="w-full flex flex-col justify-center items-center">
              <input
                type="submit"
                value="Sign up!"
                className="shadow-md hover:shadow-xl mt-2 bg-[#06923E] rounded-md text-white font-semibold w-[30%] p-2 cursor-pointer focus:scale-90 transition-all duration-300"
              />
              <p className="mt-2 italic flex gap-2 ">
                Already registered?{" "}
                <span className="flex flex-col group">
                  <Link
                    to="/"
                    className="font-bold hover:text-blue-500 transition-all duration-300"
                  >
                    Log in
                  </Link>
                  <div className="w-0 group-hover:w-full border-b-2 border-blue-500 transition-all duration-300"></div>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
