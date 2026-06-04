"use client";

import { useEffect, useState, useContext } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";
import { AuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import toast from "react-hot-toast";

const subjectColors = {
  Mathematics: "bg-[#EEEDFE] text-[#3C3489]",
  Physics:     "bg-[#FAECE7] text-[#993C1D]",
  Chemistry:   "bg-[#FAEEDA] text-[#854F0B]",
  Biology:     "bg-[#FBEAF0] text-[#72243E]",
  English:     "bg-[#E1F5EE] text-[#0F6E56]",
  "ICT / CS":  "bg-[#E6F1FB] text-[#0C447C]",
  Accounting:  "bg-[#EAF3DE] text-[#3B6D11]",
};

const modeColors = {
  Online:  "bg-[#E1F5EE] text-[#0F6E56]",
  Offline: "bg-[#FAECE7] text-[#993C1D]",
  Both:    "bg-[#E6F1FB] text-[#0C447C]",
};

export default function MyTutors() {
  const { user } = useContext(AuthContext);
  const [tutors, setTutors]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editTutor, setEditTutor] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMyTutors();
  }, []);

  async function fetchMyTutors() {
    try {
      const res = await api.get("/tutors/my-tutors");
      setTutors(res.data);
    } catch {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setDeleting(true);
    try {
      await api.delete(`/tutors/${id}`);
      toast.success("Tutor deleted!");
      setTutors((prev) => prev.filter((t) => t._id !== id));
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete tutor");
    } finally {
      setDeleting(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await api.patch(`/tutors/${editTutor._id}`, editForm);
      toast.success("Tutor updated!");
      // update local state immediately — no refetch needed
      setTutors((prev) =>
        prev.map((t) => t._id === editTutor._id ? res.data.updatedTutor : t)
      );
      setEditTutor(null);
    } catch {
      toast.error("Failed to update tutor");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <section className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto">

            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-medium text-gray-800 mb-1">My tutors</h1>
                <p className="text-sm text-gray-400">Tutors you have created and listed</p>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && tutors.length === 0 && (
              <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl bg-white">
                <p className="text-sm font-medium text-gray-700 mb-1">No tutors added yet</p>
                <p className="text-xs text-gray-400">Add your first tutor to get started.</p>
              </div>
            )}

            {/* Tutor cards */}
            <div className="grid gap-4">
              {tutors.map((tutor) => {
                const subjectClass = subjectColors[tutor.subject] || "bg-gray-100 text-gray-600";
                const modeClass    = modeColors[tutor.teachingMode] || "bg-gray-100 text-gray-600";
                return (
                  <div key={tutor._id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${subjectClass}`}>
                          {tutor.tutorName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">{tutor.tutorName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${subjectClass}`}>
                              {tutor.subject}
                            </span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${modeClass}`}>
                              {tutor.teachingMode}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-[#1D9E75]">৳{tutor.hourlyFee}/hr</p>
                        <p className="text-xs text-gray-400 mt-0.5">{tutor.totalSlot} slots left</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => { setEditTutor(tutor); setEditForm(tutor); }}
                        className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(tutor._id)}
                        className="flex items-center gap-1.5 text-xs border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Edit Modal */}
      {editTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#04342C]/60 backdrop-blur-sm" onClick={() => setEditTutor(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-medium text-gray-800">Update tutor</p>
              <button onClick={() => setEditTutor(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              {[
                { label: "Tutor name",    key: "tutorName" },
                { label: "Subject",       key: "subject" },
                { label: "Hourly fee",    key: "hourlyFee" },
                { label: "Total slots",   key: "totalSlot" },
                { label: "Available days",key: "availableDays" },
                { label: "Start time",    key: "startTime" },
                { label: "End time",      key: "endTime" },
                { label: "Institution",   key: "institution" },
                { label: "Location",      key: "location" },
                { label: "Teaching mode", key: "teachingMode" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
                  <input
                    value={editForm[key] || ""}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1D9E75] transition"
                  />
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setEditTutor(null)}
                  className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-[#1D9E75] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0F6E56] disabled:opacity-60"
                >
                  {updating ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#04342C]/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
                </svg>
              </div>
              <p className="text-base font-medium text-gray-800">Delete this tutor?</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              This will permanently remove the tutor and cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50"
              >
                Keep tutor
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}