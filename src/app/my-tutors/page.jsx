"use client";

import { useEffect, useState, useContext } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyTutors() {
  const { user } = useContext(AuthContext);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTutor, setEditTutor] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchMyTutors();
  }, []);

  async function fetchMyTutors() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/my-tutors`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTutors(res.data);
    } catch {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this tutor?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Tutor deleted!");
      setTutors((prev) => prev.filter((t) => t._id !== id));
    } catch {
      toast.error("Failed to delete tutor");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${editTutor._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Tutor updated!");
      setEditTutor(null);
      fetchMyTutors();
    } catch {
      toast.error("Failed to update tutor");
    }
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <section className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-xl font-medium text-gray-800 mb-6">My Tutors</h1>

            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {!loading && tutors.length === 0 && (
              <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-1">No tutors added yet</p>
              </div>
            )}

            <div className="grid gap-4">
              {tutors.map((tutor) => (
                <div key={tutor._id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tutor.tutorName}</h3>
                      <p className="text-gray-500 text-sm mt-1">{tutor.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 font-bold">৳{tutor.hourlyFee}/hr</p>
                      <p className="text-sm text-gray-500">{tutor.totalSlot} slots left</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${tutor.teachingMode === "Online" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"}`}>
                      {tutor.teachingMode}
                    </span>
                    <button
                      onClick={() => { setEditTutor(tutor); setEditForm(tutor); }}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tutor._id)}
                      className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Edit Modal */}
        {editTutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setEditTutor(null)} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Tutor</h2>
              <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                {[
                  { label: "Tutor Name", key: "tutorName" },
                  { label: "Subject", key: "subject" },
                  { label: "Hourly Fee", key: "hourlyFee" },
                  { label: "Total Slots", key: "totalSlot" },
                  { label: "Teaching Mode", key: "teachingMode" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                    <input
                      value={editForm[key] || ""}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                ))}
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setEditTutor(null)} className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-[#1D9E75] text-white text-sm py-2.5 rounded-lg">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </PrivateRoute>
  );
}