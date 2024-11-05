import Services from "../../Components/Services/Services";
import { service } from "../../Components/API/serviceApi";
import Buttons from "../../Components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const reDirect = () => {
    navigate('/onboarding')
  };

  return (
    <div className="px-[2rem] ">
      <div className="mt-[7.5rem] mb-[10rem] md:mb-[13rem] min-h-[100%] flex items-center justify-between">
        <div className="font-bold">
          <div className="flex items-start flex-col">
            <h3 className="mb-[1rem] text-[2.3rem] md:text-[3rem]">
              Seamless AI-Powered
              <span className="text-blue-800 mb-[1rem] block">Lung Cancer</span>
              Detection System!{" "}
            </h3>
            <p className="text-[0.9rem] md:text-[0.8rem]">
              Streamline Lung Cancer Diagnosis with a platform powered by{" "}
              <span className="text-blue-800">AI!</span>
            </p>
            <Buttons
              text={"Get Started"}
              onClick={reDirect}
              className={" border-blue-800 text-[1.3rem] md:text-[1.2rem]"}
            />
          </div>
        </div>

        <div className=" hidden md:flex w-[50%]  items-center justify-center">
          <img
            src="/home.png"
            alt="Home.jpg"
            className="w-[80%] object-contain"
          />
        </div>
      </div>

      <div className="mt-[5rem] mb-[2rem]">
        <h4 className="text-center font-bold mb-[3rem] text-[1.2rem] md:text-[1.5rem]">
          Built for Advanced AI-Driven Lung Cancer Detection
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {service.map((item, id) => (
            <Services
              key={item.id}
              sub_title={item.caption}
              desc={item.desc}
              image={item.img}
              className={
                (id === 1 ? "mt-[4.7rem]" : "") ||
                (id === 2 ? "md:mt-[1.6rem]" : "")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
