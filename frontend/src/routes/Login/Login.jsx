import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import FormComponent from "../../Components/Form/FormComponent";
import { login } from "../../api/api";

const Login = () => {
  const [loading, setLoading] = useState(true);

  const handleLogin = async (userData) => {
    // Call your login API here
    return await login(userData);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="signup">
      {loading ? (
        <Loader />
      ) : (
        <FormComponent
          onSubmit={handleLogin}
          isLogin={true}
          imageUrl="path/to/login-image.jpg"
        />
      )}
    </div>
  );
};

export default Login;
