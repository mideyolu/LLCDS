import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import FormComponent from "../../Components/Form/FormComponent";
import { login } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      // Call your login API here
      const response = await login(userData);
      if (response.message === "User Login successful") {
        // Save the access token in localStorage
        localStorage.setItem("token", response.access_token);

        // Display success toast
        toast.success("Login successful! Redirecting to dashboard...");
        // Redirect to login after a delay
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Login failed. Try again.");
    }
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
