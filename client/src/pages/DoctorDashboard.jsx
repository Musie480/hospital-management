import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { 
  FaUserMd, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, 
  FaUser, FaPhone, FaEnvelope, FaCog, FaSignOutAlt 
} from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>,
  confirmed: <FaCheckCircle className="text-blue-500" />,
  completed: <FaCheckCircle className="text-green-500" />,
  cancelled: <FaTimesCircle className="text-red-500" />,
};

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState({});
  const [statusEdits, setStatusEdits] = useState({});
  const [activeTab, setActiveTab] = useState("upcoming");
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
  });

  // Redirect if not doctor
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "doctor") {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch appointments for this doctor
  useEffect(() => {
    if (user && user.role === "doctor") {
      axios
        .get(`http://localhost:5000/api/doctors/user/${user.id}`)
        .then((res) => {
          const doctorId = res.data.id;
          return axios.get(`http://localhost:5000/api/doctor/appointments?doctor_id=${doctorId}`);
        })
        .then((res) => {
          setAppointments(res.data);
          
          // Calculate statistics
          const total = res.data.length;
          const upcoming = res.data.filter(appt => 
            appt.status === 'pending' || appt.status === 'confirmed'
          ).length;
          const completed = res.data.filter(appt => 
            appt.status === 'completed'
          ).length;
          
          setStats({ total, upcoming, completed });
        })
        .catch(() => setAppointments([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleStatusChange = (id, value) => {
    setStatusEdits((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusUpdate = async (id) => {
    setStatusUpdating((prev) => ({ ...prev, [id]: true }));
    try {
      await axios.patch(
        `http://localhost:5000/api/doctor/appointments/${id}/status`,
        { status: statusEdits[id] }
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: statusEdits[id] } : appt
        )
      );
      setStatusEdits(prev => {
        const newEdits = {...prev};
        delete newEdits[id];
        return newEdits;
      });
    } catch {
      alert("Failed to update status");
    } finally {
      setStatusUpdating((prev) => {
        const newStatus = {...prev};
        delete newStatus[id];
        return newStatus;
      });
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    if (activeTab === "upcoming") {
      return appt.status === "pending" || appt.status === "confirmed";
    } else if (activeTab === "completed") {
      return appt.status === "completed";
    } else if (activeTab === "cancelled") {
      return appt.status === "cancelled";
    }
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-teal-700 text-white py-4 px-8 flex items-center justify-between shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <FaUserMd className="text-2xl" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Doctor Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full">
            <div className="bg-white/30 w-8 h-8 rounded-full flex items-center justify-center">
              <FaUser className="text-sm" />
            </div>
            <span className="font-medium">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-600 font-medium">Total Appointments</h3>
                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <FaCalendarAlt />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-teal-500">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-600 font-medium">Upcoming</h3>
                <div className="bg-teal-100 text-teal-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <FaClock />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.upcoming}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-600 font-medium">Completed</h3>
                <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <FaCheckCircle />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.completed}</p>
            </div>
          </div>

          {/* Tabs and Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Appointments</h2>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "upcoming" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "completed" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "cancelled" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("cancelled")}
                >
                  Cancelled
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "all" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
              </div>
            </div>

            {/* Appointments List */}
            <div className="p-4 md:p-6">
              {loading ? (
                <div className="flex flex-col gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-xl p-6">
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/6"></div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCalendarAlt className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600">No appointments found</h3>
                  <p className="text-gray-500 mt-2">
                    {activeTab === "upcoming" 
                      ? "You have no upcoming appointments" 
                      : activeTab === "completed"
                      ? "No completed appointments"
                      : activeTab === "cancelled"
                      ? "No cancelled appointments"
                      : "No appointments found"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow p-6 border border-gray-100 hover:shadow-xl transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <FaUser className="text-teal-600" />
                            <h3 className="font-bold text-lg text-gray-800">{appt.patient_name}</h3>
                          </div>
                          <div className="flex items-center mt-2 gap-2 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                              statusColors[appt.status] || "bg-gray-100 text-gray-700"
                            }`}>
                              {appt.status}
                            </span>
                            {statusIcons[appt.status]}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-gray-700 text-sm">
                              <FaCalendarAlt className="text-teal-400" />
                              <span>{formatDate(appt.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                              <FaClock className="text-teal-400" />
                              <span>{appt.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <FaPhone className="text-sm text-teal-500" />
                            <span className="font-medium">Phone:</span>
                            <span>{appt.patient_phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaEnvelope className="text-sm text-teal-500" />
                            <span className="font-medium">Email:</span>
                            <span>{appt.patient_email}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <select
                            className={`px-3 py-2 rounded-xl text-sm font-medium capitalize border ${
                              statusColors[appt.status] || "bg-gray-100 text-gray-700"
                            }`}
                            value={statusEdits[appt.id] ?? appt.status}
                            onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                            disabled={statusUpdating[appt.id]}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleStatusUpdate(appt.id)}
                            disabled={
                              statusUpdating[appt.id] || 
                              (statusEdits[appt.id] ?? appt.status) === appt.status
                            }
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                              (statusEdits[appt.id] ?? appt.status) === appt.status
                                ? "bg-gray-200 text-gray-500"
                                : "bg-teal-600 text-white hover:bg-teal-700"
                            }`}
                          >
                            {statusUpdating[appt.id] ? (
                              <span className="flex items-center gap-2">
                                <FaCog className="animate-spin" /> Saving...
                              </span>
                            ) : (
                              "Update Status"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-teal-800 text-white py-6 px-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Serenity Medical Center. All rights reserved.</p>
        <p className="mt-2 text-blue-200">Secure Doctor Dashboard v2.0</p>
      </footer>
    </div>
  );
};

export default DoctorDashboard;