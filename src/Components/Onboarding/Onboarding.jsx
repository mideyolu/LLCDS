import { FiLogIn } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Onboarding = ({
  title = "Get Started",
  subtitle = "Select an option suited for you",
  options,
  imageSrc = "/Get.png",
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Define default options with navigation
  const defaultOptions = [
    {
      label: "Signup",
      icon: <IoMdPersonAdd className="text-[1.5rem] text-gray-500" />,
      onClick: () => navigate("/signup"),
      text: "Create your account",
    },
    {
      label: "Login",
      icon: <FiLogIn className="text-[1.5rem] text-gray-500" />,
      onClick: () => navigate("/login"),
      text: "Sign-in to your account",
    },
  ];

  const renderedOptions = options || defaultOptions;

  const Navigate = () => {
    navigate("/signup");
  };

  return (
    <div className="onboarding h-screen flex items-center justify-center bg-gray-50">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex mx-auto max-w-[1300px] h-[90vh] w-full rounded-md shadow-xl">
          {/* Left Section */}
          <div className="left flex-1 flex items-center justify-between p-[4rem] h-full">
            <div className="flex items-start flex-col space-y-10 gap-[3rem]">
              <div>
                <h4 className="font-semibold text-[1.3rem] md:text-[2.9rem]">
                  {title}
                </h4>
                <p className="text-gray-500 font-normal text-[0.9rem] md:text-[0.85rem]">
                  {subtitle}
                </p>
              </div>
              {renderedOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={option.onClick}
                >
                  {option.icon}
                  <div className="flex items-start gap-2 flex-col">
                    <span className="text-black text-[1.1rem] font-semibold">
                      {option.label}
                    </span>
                    <span className="text-gray-500">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="font-normal text-[.9rem] absolute top-[80%] right-[55%] flex items-center gap-2 cursor-pointer" onClick={Navigate}>
            Next <FaArrowRight />
          </div>

          {/* Right Section */}
          <div className="right flex-1 h-full bg-blue-800 p-[4rem]">
            <div className="h-[95%] w-full bg-cover bg-center flex items-center">
              <img
                src={imageSrc}
                alt="Onboarding illustration"
                className="flex items-center mx-auto justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
