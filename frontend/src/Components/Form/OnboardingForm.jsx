// FormComponent.jsx
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FormComponent = ({ onSubmit, isLogin, imageUrl }) => {
  const navigate = useNavigate();

  const reLogin = () => {
    navigate("/login");
  };
  const reGister = () => {
    navigate("/signup");
  };

  return (
    <div className="flex md:h-screen mt-[30%] md:mt-0 ">
      <div className="flex flex-col justify-center w-[60%] max-w-md p-10 mx-auto shadow-md ">
        <div className="">
          <h2 className="text-2xl font-bold mb-6 md:text-center underline-offset-8 underline">
            Get Started
          </h2>

          <p className="md:text-center text-gray-400">
            Select an option suited for you
          </p>
        </div>

        <form className="space-y-[20%] md:space-y-9 bg-white p-6">
          <div>
            <label className="cursor-pointer flex gap-4" onClick={reGister}>
              <IoMdPersonAdd className="text-[1.5rem] text-gray-500" />
              Signup
            </label>
            <span className="text-gray-500">Create your account</span>
          </div>
          <div>
            <label className="cursor-pointer flex gap-4" onClick={reLogin}>
              <FiLogIn className="text-[1.5rem] text-gray-500" />
              Login
            </label>
            <span className="text-gray-500">Sign-in to your account</span>
          </div>
        </form>
      </div>

      <div className="absolute top-[70%] right-[30%] md:right-[60%] md:top-[80%]">
        <div className="flex items-center gap-1">
          <FaArrowLeft className="text-gray-500 text-[0.8rem] " /> Back
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-blue-800 items-center justify-center">
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
