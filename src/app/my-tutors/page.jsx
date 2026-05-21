"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

export default function MyTutors() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <section className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D9E75]"></div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="flex-1 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tutors</h1>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-gray-600">Your tutors will appear here</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
    setTutors((prev) => prev.filter((t) => t._id !== deletedId));
    setShowDeleteModal(false);
    toast.success("Tutor deleted successfully!");
  }

  // ── slot bar color logic ──
  function slotBarColor(slot) {
    if (slot === 0) return "bg-red-400";
    if (slot <= 3) return "bg-amber-400";
    return "bg-[#1D9E75]";
  }

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

  // ── stats derived from tutors list ──
  const totalSlots    = tutors.reduce((s, t) => s + (t.totalSlot || 0), 0);
  const totalBookings = tutors.reduce((s, t) => s + (t.bookedCount || 0), 0);
  const fullyBooked   = tutors.filter((t) => t.totalSlot === 0).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-800 mb-1">My tutors</h1>
          <p className="text-sm text-gray-400">
            Tutors you have created and listed on MediQueue
          </p>
        </div>
        <button
          onClick={() => navigate("/add-tutor")}
          className="flex items-center gap-2 bg-[#1D9E75] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0F6E56] transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add new tutor
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total tutors</p>
          <p className="text-2xl font-medium text-gray-800">
            {loading ? "—" : tutors.length}
          </p>
        </div>
        <div className="bg-[#E1F5EE] rounded-xl p-4">
          <p className="text-xs text-[#0F6E56] mb-1">Active slots</p>
          <p className="text-2xl font-medium text-[#085041]">
            {loading ? "—" : totalSlots}
          </p>
        </div>
        <div className="bg-[#FAEEDA] rounded-xl p-4">
          <p className="text-xs text-[#854F0B] mb-1">Total bookings</p>
          <p className="text-2xl font-medium text-[#633806]">
            {loading ? "—" : totalBookings}
          </p>
        </div>
        <div className="bg-[#FCEBEB] rounded-xl p-4">
          <p className="text-xs text-red-400 mb-1">Fully booked</p>
          <p className="text-2xl font-medium text-red-700">
            {loading ? "—" : fullyBooked}
          </p>
        </div>
      </div>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-14 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && tutors.length === 0 && (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            No tutors added yet
          </p>
          <p className="text-xs text-gray-400 mb-4">
            You haven't listed any tutors. Click below to get started.
          </p>
          <button
            onClick={() => navigate("/add-tutor")}
            className="bg-[#1D9E75] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#0F6E56] transition-colors"
          >
            + Add your first tutor
          </button>
        </div>
      )}

      {/* ── Table ── */}
      {!loading && tutors.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    "Tutor",
                    "Subject",
                    "Schedule",
                    "Fee / hr",
                    "Slots",
                    "Mode",
                    "Start date",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-gray-400 px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {tutors.map((tutor) => {
                  const subjectClass =
                    subjectColors[tutor.subject] ||
                    "bg-gray-100 text-gray-600";
                  const modeClass =
                    modeColors[tutor.teachingMode] ||
                    "bg-gray-100 text-gray-600";
                  const isFullyBooked = tutor.totalSlot === 0;

                  return (
                    <tr
                      key={tutor._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Tutor name + avatar */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          {tutor.photo ? (
                            <img
                              src={tutor.photo}
                              alt={tutor.tutorName}
                              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium ${subjectClass}`}
                            >
                              {tutor.tutorName?.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className="font-medium text-gray-800 whitespace-nowrap">
                            {tutor.tutorName}
                          </span>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${subjectClass}`}
                        >
                          {tutor.subject}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        <span className="block">{tutor.availableDays}</span>
                        <span className="block">
                          {tutor.startTime} – {tutor.endTime}
                        </span>
                      </td>

                      {/* Fee */}
                      <td className="px-4 py-3 font-medium text-[#1D9E75] whitespace-nowrap">
                        ৳{tutor.hourlyFee}
                      </td>

                      {/* Slots with mini progress bar */}
                      <td className="px-4 py-3 min-w-[90px]">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`text-xs font-medium ${
                              isFullyBooked
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            {tutor.totalSlot}
                          </span>
                          <span className="text-xs text-gray-300">
                            / {tutor.originalSlot || 20}
                          </span>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden w-16">
                          <div
                            className={`h-full rounded-full ${slotBarColor(tutor.totalSlot)}`}
                            style={{
                              width: `${Math.min(
                                (tutor.totalSlot /
                                  (tutor.originalSlot || 20)) *
                                  100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </td>

                      {/* Mode */}
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${modeClass}`}
                        >
                          {tutor.teachingMode}
                        </span>
                      </td>

                      {/* Start date */}
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(tutor.sessionStartDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <button
                            onClick={() => {
                              setSelectedTutor(tutor);
                              setShowUpdateModal(true);
                            }}
                            className="flex items-center gap-1 text-xs border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                            </svg>
                            Edit
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              setSelectedTutor(tutor);
                              setShowDeleteModal(true);
                            }}
                            className="flex items-center gap-1 text-xs border border-red-200 bg-red-50 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors text-red-500"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {showUpdateModal && selectedTutor && (
        <UpdateTutorModal
          tutor={selectedTutor}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {showDeleteModal && selectedTutor && (
        <DeleteTutorModal
          tutor={selectedTutor}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}