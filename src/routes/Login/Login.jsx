import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="signup">
      {loading ? <Loader /> : <div className="">Login</div>}
    </div>
  );
};

export default Login;
