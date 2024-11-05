import { useEffect, useState } from "react";
import OnboardingForm from "../../Components/Form/OnboardingForm";
import Loader from "../../Components/Loader/Loader";

const Onboarding = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="onboarding">
      {loading ? <Loader /> : <OnboardingForm  imageUrl={"/Get.png"}/>}
    </div>
  );
};

export default Onboarding;
