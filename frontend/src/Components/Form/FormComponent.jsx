import React, { useState } from "react";
import { validateEmail, validatePassword } from "../../api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormComponent = ({ onSubmit, isLogin, imageUrl }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username) {
      toast.error("Username is required");
      return;
    }
    if (!isLogin && !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const userData = isLogin
        ? { username, password }
        : { username, email, password };
      const data = await onSubmit(userData);
      console.log(data); // Handle successful response (e.g., store token)
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again."); // Display error from API response if available
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center w-[60%] max-w-md p-10 mx-auto ">
        <h2 className="text-2xl font-bold mb-6 text-center underline-offset-8 underline">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md md:rounded-none md:shadow-none "
        >
          <div className="">
            <label className="block">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full md:w-[60%] rounded"
            />
          </div>
          {!isLogin && (
            <div className="">
              <label className="block">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full md:w-[60%] rounded"
              />
            </div>
          )}
          <div className="">
            <label className="block">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full md:w-[60%] rounded"
            />
          </div>
          <div className="">
            {isLogin ? (
              <Link
                className=" relative md:absolute md:top-[70%] md:right-[40%] text-[0.7rem] text-gray-500"
                to={"/signup"}
              >
                Don't Have An Account?
              </Link>
            ) : (
              <Link
                className="text-[0.7rem] text-gray-500 relative md:absolute md:top-[70%] md:right-[40%] "
                to={"/login"}
              >
                Already Have An Account?
              </Link>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full md:w-[30%] md:flex md:items-center md:justify-center md:content-center md:ml-[3rem] md:mr-[3rem]"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="hidden md:flex w-2/6 bg-blue-800 items-center justify-center">
        <img
          src={imageUrl}
          alt="Background"
          className="object-contain max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default FormComponent;
