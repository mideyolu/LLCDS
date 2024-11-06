// components/Dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import { getDashboardData } from "../../api/api"; // Import the API call
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../api/api"; // Import logout function

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if token exists in localStorage
    if (!token) {
      toast.error("You need to be logged in to access the dashboard.");
      navigate("/login"); // Redirect to login page if no token
      return;
    }

    // Fetch dashboard data when the component mounts
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setPatients(data.patients); // Assuming the response contains the patients array
        setTotalPatients(data.patient_count); // Assuming the response contains the total number of patients
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout(); // Call logout function to remove token and redirect to login
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching the data
  }

  return (
    <div className="dashboard">
      <h2 className="text-center">Patient Dashboard</h2>
      <div className="text-center mb-4">
        <h3>Total Patients: {totalPatients}</h3>
      </div>
      <div className="patients-list">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div key={patient.patient_id} className="patient-card">
              <h4>{patient.name}</h4>
              <p>Age: {patient.age}</p>
              <p>Gender: {patient.gender}</p>
              <p>Email: {patient.email}</p>
              <p>Notes: {patient.notes}</p>
              <p>Diagnosis: {patient.diagnosis}</p>
            </div>
          ))
        ) : (
          <p>No patients available.</p>
        )}
      </div>
      <div className="logout-button">
        <button onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
