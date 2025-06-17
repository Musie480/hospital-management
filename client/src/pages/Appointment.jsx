import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    physician_or_treatment: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/appointment", form);
      alert("✅ Successful appointment! We'll get in touch with you.");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error(error);
      alert("❌ Failed to book appointment. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input"
            required
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="input"
            required
          />
          <input
            type="text"
            name="physician_or_treatment"
            value={form.physician_or_treatment}
            onChange={handleChange}
            placeholder="Physician / Treatment"
            className="input"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            required
          />
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
