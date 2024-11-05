import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross1, RxArrowRight } from "react-icons/rx";
import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menu = (prev) => {
    setOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const reDirect = () => {
    navigate("/onboarding");
  };

  return (
    <div className="font-semibold fixed top-0 w-full flex items-center justify-around py-[0.7rem] md:py-[0.7rem] px-[2rem]">
      <div className=" font-bold flex items-center gap-2">
        <img
          src="/logo.jpg"
          alt="Logo.jpg"
          className="w-[10%] md:w-[5%] rounded-full"
        />
        Res<span className="-ml-[0.5rem] text-blue-900">pirix</span>
      </div>

      <div className="hidden lg:flex md:hidden text-center w-[15%]">
        <Buttons
          text={`Try it Now ${"->"}`}
          className={" bg-black text-white w-[60%] hover:scale-105 transition-all duration-150 "}
          onClick={reDirect}
        />
      </div>

      <div className="cursor-pointer text-[1rem] lg:hidden" onClick={menu}>
        {open ? (
          <RxCross1 className={`${open ? "opacity-100" : "opacity-0"}`} />
        ) : (
          <IoMenu className={`${open ? "opacity-0" : "opacity-100"}`} />
        )}
      </div>

      {open && (
        <div className="transition-all duration-300 mt-2 rounded-lg z-100 place-items-center gap-3 bg-primary p-[2rem] grid grid-rows-2 absolute left-[65%] lg:hidden md:left-[80%] top-[100%]">
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
