const Services = ({ sub_title, image, desc, className }) => {
  return (
    <div className={` mt-[4rem] w-[] ${className}`}>
      <div className=" shadow-md rounded-md flex items-center cursor-pointer gap-[1.2rem] text-center flex-col px-2 py-3 h-[100%] transition-all  ease-in-out duration-150 hover:scale-105">
        <img src={image} alt="" className="rounded-[100%] w-[40%]" />
        <h5 className="text-[1.1rem] md:text-[1.3rem font-semibold">{sub_title}</h5>
        <p className=" text-gray-500 text-[0.9rem] md:text-[1.1rem]">{desc}</p>
      </div>
    </div>
  );
};

export default Services;
