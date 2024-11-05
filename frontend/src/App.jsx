import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import HomePage from "./routes/HomePage/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./routes/Signup/Signup";
import Login from "./routes/Login/Login";
import Onboarding from "./routes/Onboarding/Onboarding";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/onboarding", "/signup"];
  return (
    <div className="app">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes className="">
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<Onboarding/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <div className="div">
        {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
      </div>
    </div>
  );
};

export default App;
