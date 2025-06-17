// src/Appointment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaStethoscope, FaCalendar, FaClock, FaCheck, FaSpinner } from 'react-icons/fa';

const Appointment = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    date: "",
    time: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const departments = [
    "General Medicine", "Cardiology", "Neurology", 
    "Pediatrics", "Orthopedics", "Dermatology"
  ];
  
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Send data to backend API
      const res = await axios.post("http://localhost:5000/routes/appointment", form);
      
      if (res.status === 200) {
        setSuccess(true);
        // Optionally reset form after successful submission
        setTimeout(() => {
          setForm({
            name: "",
            phone: "",
            email: "",
            department: "",
            date: "",
            time: ""
          });
          setSuccess(false);
          navigate("/"); // Redirect to homepage after 3 seconds
        }, 3000);
      }
    } catch (err) {
      console.error("Appointment booking error:", err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format
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
                          name="name"
                          value={form.name}
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
                          name="phone"
                          value={form.phone}
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
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaStethoscope className="text-gray-400" />
                          </div>
                          <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none bg-white"
                            required
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept, index) => (
                              <option key={index} value={dept}>{dept}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
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
                    </div>
                    
                    <div className="mb-6">
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
                          {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-teal-500 rounded-r-lg p-4 mb-6">
                      <div className="flex">
                        <FaCheck className="text-blue-500 mt-0.5 mr-2" />
                        <p className="text-blue-800">Please arrive 15 minutes before your appointment. Bring your insurance card and ID.</p>
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
                        <span className="font-medium">{form.name}</span>
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
                        <span className="font-medium">{form.department}</span>
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