import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch all appointments
  useEffect(() => {
    if (user && user.role === "admin") {
      axios
        .get("http://localhost:5000/api/admin/appointments")
        .then((res) => setAppointments(res.data))
        .catch(() => setAppointments([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-teal-700 text-white py-4 px-8 flex items-center justify-between shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <span className="font-medium">Welcome, {user?.name}</span>
      </header>
      <main className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-6">All Appointments</h2>
        {loading ? (
          <div>Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-gray-500">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Patient Name</th>
                  <th className="py-2 px-4 border-b">Doctor</th>
                  <th className="py-2 px-4 border-b">Department</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td className="py-2 px-4 border-b">{appt.patient_name}</td>
                    <td className="py-2 px-4 border-b">{appt.doctor_name}</td>
                    <td className="py-2 px-4 border-b">{appt.department_name}</td>
                    <td className="py-2 px-4 border-b">{appt.date}</td>
                    <td className="py-2 px-4 border-b">{appt.time}</td>
                    <td className="py-2 px-4 border-b">{appt.status || "pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;