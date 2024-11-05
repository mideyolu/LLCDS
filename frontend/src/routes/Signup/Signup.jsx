import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import FormComponent from "../../Components/Form/FormComponent";
import {signup} from '../../api/api'


const Signup = () => {
  const [loading, setLoading] = useState(true);

   const handleSignup = async (userData) => {
     // Call your signup API here
     return await signup(userData);
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
