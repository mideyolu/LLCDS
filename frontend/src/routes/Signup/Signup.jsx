import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import FormComponent from "../../Components/Form/FormComponent";
import { signup } from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Handles signup API call with error handling
  const handleSignup = async (userData) => {
    try {
      const response = await signup(userData);
      if (response.message === "User created successfully") {
        // Display success toast
        toast.success("Signup successful! Redirecting to login...");
        // Redirect to login after a delay
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      // Display error message in toast
      toast.error(error.response?.data?.detail || "Signup failed. Try again.");

    //   User Login successful
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
          onSubmit={handleSignup}
          isLogin={false}
          imageUrl="path/to/signup-image.jpg"
        />
      )}
    </div>
  );
};

export default Signup;
