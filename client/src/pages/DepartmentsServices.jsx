import { useEffect, useState } from "react";
import axios from "axios";

export default function DepartmentsServices() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [deptRes, docRes] = await Promise.all([
          axios.get("http://localhost:5000/api/departments"),
          axios.get("http://localhost:5000/api/doctors"),
        ]);
        setDepartments(deptRes.data);
        setDoctors(docRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Departments */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-teal-700">Departments & Services</h2>
        {departments.map((dept) => (
          <div key={dept.id} className="mb-8 p-4 border border-teal-300 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-teal-900">{dept.name}</h3>
            <p className="mb-3 text-gray-700">{dept.description}</p>
            <h4 className="font-semibold text-teal-700 mb-2">Services:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {dept.services.length > 0 ? (
                dept.services.map((service) => (
                  <li key={service.id} title={service.description}>{service.name}</li>
                ))
              ) : (
                <li>No services listed</li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Doctors */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-teal-700">Our Doctors</h2>
        {doctors.map((doc) => (
          <div key={doc.id} className="mb-8 p-4 border border-teal-300 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-teal-900">{doc.name}</h3>
            <p className="mb-1 italic text-teal-700">{doc.specialization}</p>
            <p className="mb-3 text-gray-700">{doc.bio}</p>
            <h4 className="font-semibold text-teal-700 mb-2">Education:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {doc.education.length > 0 ? (
                doc.education.map((edu, i) => (
                  <li key={i}>
                    {edu.degree}, {edu.institution} ({edu.year})
                  </li>
                ))
              ) : (
                <li>Education details not available</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
