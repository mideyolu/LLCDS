import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";

const Signup = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="signup">
      {loading ? <Loader /> : <div className="">Signup</div>}
    </div>
  );
};

export default Signup;
