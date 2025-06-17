import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "doctor") {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:5000/api/doctors/user/${user.id}`)
        .then((res) => {
          setProfile(res.data);
          setForm({
            name: res.data.name,
            bio: res.data.bio,
            department_id: res.data.department_id,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(
        `http://localhost:5000/api/doctors/${profile.id}`,
        form
      );
      setProfile((prev) => ({ ...prev, ...form }));
      setEdit(false);
    } catch {
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-teal-800 mb-6">My Profile</h2>
        {!edit ? (
          <>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="ml-2">{profile.name}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Bio:</span>
              <span className="ml-2">{profile.bio}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Department ID:</span>
              <span className="ml-2">{profile.department_id}</span>
            </div>
            <button
              className="bg-teal-600 text-white px-6 py-2 rounded-xl font-medium shadow hover:bg-teal-700 transition"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department ID
              </label>
              <input
                type="number"
                name="department_id"
                value={form.department_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-teal-600 text-white px-6 py-2 rounded-xl font-medium shadow hover:bg-teal-700 transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-medium shadow hover:bg-gray-300 transition"
                onClick={() => setEdit(false)}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;