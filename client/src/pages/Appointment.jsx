// src/Appointment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaStethoscope, FaCalendar, FaClock, FaCheck, FaSpinner } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";

const Appointment = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorEducation, setDoctorEducation] = useState([]);
  const [form, setForm] = useState({
    patient_name: "",
    patient_phone: "",
    patient_email: "",
    department_id: "",
    doctor_id: "",
    date: "",
    time: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch departments from DB
  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(() => setDepartments([]));
  }, []);

  // Fetch doctors when department changes
  useEffect(() => {
    if (form.department_id) {
      axios.get(`http://localhost:5000/api/doctors?department_id=${form.department_id}`)
        .then(res => setDoctors(res.data))
        .catch(() => setDoctors([]));
      setForm(f => ({ ...f, doctor_id: "" }));
      setSelectedDoctor(null);
      setDoctorEducation([]);
    } else {
      setDoctors([]);
      setForm(f => ({ ...f, doctor_id: "" }));
      setSelectedDoctor(null);
      setDoctorEducation([]);
    }
  }, [form.department_id]);

  // Fetch doctor details and education when doctor changes
  useEffect(() => {
    if (form.doctor_id) {
      axios.get(`http://localhost:5000/api/doctors/${form.doctor_id}`)
        .then(res => setSelectedDoctor(res.data))
        .catch(() => setSelectedDoctor(null));
      axios.get(`http://localhost:5000/api/doctors/${form.doctor_id}/education`)
        .then(res => setDoctorEducation(res.data))
        .catch(() => setDoctorEducation([]));
    } else {
      setSelectedDoctor(null);
      setDoctorEducation([]);
    }
  }, [form.doctor_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Send user_id with appointment
      const res = await axios.post("http://localhost:5000/api/appointment", {
        ...form,
        user_id: user.id
      });
      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setForm({
            patient_name: "",
            patient_phone: "",
            patient_email: "",
            department_id: "",
            doctor_id: "",
            date: "",
            time: ""
          });
          setSuccess(false);
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Branding and Information */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-teal-700 to-blue-800 text-white p-8">
            <div className="flex items-center mb-10">
              <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mr-3">
                <FaStethoscope className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold">MediCare Center</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Book Your Appointment Online</h2>
            <p className="text-teal-200 mb-10">Fast, secure, and convenient scheduling with our healthcare professionals</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/15 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <FaCalendar className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Easy Scheduling</h3>
                  <p className="text-teal-100">Book appointments 24/7 at your convenience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/15 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Time Saving</h3>
                  <p className="text-teal-100">No more waiting on phone calls or in lines</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/15 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <FaCheck className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Instant Confirmation</h3>
                  <p className="text-teal-100">Receive immediate booking confirmation</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Form */}
          <div className="w-full md:w-3/5 p-8">
            {!success ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Book an Appointment</h2>
                  <p className="text-gray-600">Fill in your details to schedule your visit</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="patient_name"
                          value={form.patient_name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="patient_phone"
                          value={form.patient_phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="patient_email"
                        value={form.patient_email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaStethoscope className="text-gray-400" />
                      </div>
                      <select
                        name="department_id"
                        value={form.department_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none bg-white"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
                    <div className="relative">
                      <select
                        name="doctor_id"
                        value={form.doctor_id}
                        onChange={handleChange}
                        className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none bg-white"
                        required
                        disabled={!form.department_id}
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Doctor Details */}
                  {selectedDoctor && (
                    <div className="mb-6 p-4 border rounded-xl bg-gray-50">
                      <div className="mb-2 font-semibold text-teal-700">{selectedDoctor.name}</div>
                      <div className="mb-2 text-gray-700">{selectedDoctor.bio}</div>
                      <div>
                        <span className="font-semibold">Education:</span>
                        <ul className="list-disc list-inside ml-4">
                          {doctorEducation.length > 0 ? doctorEducation.map(edu => (
                            <li key={edu.id}>{edu.degree}, {edu.institution} ({edu.year})</li>
                          )) : <li>No education info</li>}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendar className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          min={getTomorrowDate()}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaClock className="text-gray-400" />
                        </div>
                        <select
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none bg-white"
                          required
                        >
                          <option value="">Select Time Slot</option>
                          {["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 mb-6">
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-3xl text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-10">
                  We've received your appointment details and will contact you shortly to confirm.
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-10">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Appointment Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{form.patient_name}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{selectedDoctor?.name}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{form.date}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{form.time}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{departments.find(dept => dept.id === form.department_id)?.name}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm">
                  You will be redirected to the homepage shortly...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;