import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // New combined page
import Appointment from "./pages/Appointment";
import DepartmentsServices from "./pages/DepartmentsServices"; // New page for departments and services

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/departments" element={<DepartmentsServices />} />
    </Routes>
  );
}

export default App;
