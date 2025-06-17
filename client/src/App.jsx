import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // New combined page
import Appointment from "./pages/Appointment";
import DepartmentsServices from "./pages/DepartmentsServices"; // New page for departments and services
import Signup from "./pages/Signup.jsx"; 
import Login from "./pages/Login.jsx"; 
import AdminDashboard from "./pages/AdminDashboard.jsx"; 
import DoctorDashboard from "./pages/DoctorDashboard.jsx"; 
import DoctorProfile from "./pages/DoctorProfile.jsx"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/departments" element={<DepartmentsServices />} />
      <Route path="/DepartmentsServices" element={<DepartmentsServices />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/profile" element={<DoctorProfile />} />
    </Routes>
  );
}

export default App;
