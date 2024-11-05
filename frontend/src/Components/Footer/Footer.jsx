import { Link } from "react-router-dom";
const Footer = () => {
  const date = new Date().getFullYear();
  

  return (
    <div className=" footer text-[0.9rem] text-center py-[2rem] px-[2rem]">
      <div className="flex items-center justify-between flex-col md:flex-row  gap-[1rem]">
        <div className="d">&copy; Copright {date}</div>

        <div className="capitalize ">
          <h5 className="mb-2 md:mb-0">
            Designed by Project Group 9
          </h5>
          <p>
            {/* <Link to={'/'}>View Repo</Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
