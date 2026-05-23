"use client";

<<<<<<< HEAD
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";
import { AuthContext } from "@/context/AuthContext";

const statusStyles = {
  "Pending confirmation": "bg-[#FAEEDA] text-[#633806]",
  "confirmed":            "bg-[#E1F5EE] text-[#085041]",
  "cancelled":            "bg-[#FCEBEB] text-[#791F1F]",
};

const subjectColors = {
  Mathematics: "bg-[#EEEDFE] text-[#3C3489]",
  Physics:     "bg-[#FAECE7] text-[#993C1D]",
  Chemistry:   "bg-[#FAEEDA] text-[#854F0B]",
  Biology:     "bg-[#FBEAF0] text-[#72243E]",
  English:     "bg-[#E1F5EE] text-[#0F6E56]",
  "ICT / CS":  "bg-[#E6F1FB] text-[#0C447C]",
  Accounting:  "bg-[#EAF3DE] text-[#3B6D11]",
};

export default function MySessionsPage() {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [cancelling, setCancelling] = useState(null); // id of booking being cancelled
  const [confirmId, setConfirmId] = useState(null);   // id shown in confirm modal

  useEffect(() => {
    if (!user) return;
    fetchSessions();
  }, [user]);

  async function fetchSessions() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/my-bookings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSessions(res.data);
    } catch {
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    setCancelling(id);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Session cancelled");
      // update local state immediately
      setSessions((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, bookStatus: "cancelled" } : s
        )
      );
    } catch {
      toast.error("Failed to cancel session");
    } finally {
      setCancelling(null);
      setConfirmId(null);
    }
  }

  // stats
  const total     = sessions.length;
  const confirmed = sessions.filter((s) => s.bookStatus === "confirmed").length;
  const pending   = sessions.filter((s) => s.bookStatus === "Pending confirmation").length;
  const cancelled = sessions.filter((s) => s.bookStatus === "cancelled").length;

=======
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_SESSIONS = [
  {
    id: "1",
    tutorName: "Rakib Sultani",
    initials: "RS",
    color: "bg-emerald-600",
    subject: "Mathematics",
    subjectColor:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-RS-8814",
    bookedOn: "16 May 2025",
    status: "Confirmed",
  },
  {
    id: "2",
    tutorName: "Nazia Khatun",
    initials: "NK",
    color: "bg-blue-600",
    subject: "Physics",
    subjectColor:
      "bg-blue-50 text-blue-700 border-blue-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-NK-1181",
    bookedOn: "15 May 2025",
    status: "Confirmed",
  },
];

export default function MySessionsPage() {
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        {/* Breadcrumb */}
<<<<<<< HEAD
        <nav className="flex items-center gap-1.5 px-5 py-2.5 bg-white border-b border-gray-100 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">My Booked Sessions</span>
        </nav>

        <section className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-medium text-gray-800 mb-1">
                  My booked sessions
                </h1>
                <p className="text-sm text-gray-400">
                  All sessions booked under your account
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-lg">
                {user?.email}
              </span>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Total booked</p>
                <p className="text-2xl font-medium text-gray-800">{loading ? "—" : total}</p>
              </div>
              <div className="bg-[#E1F5EE] rounded-xl p-4">
                <p className="text-xs text-[#0F6E56] mb-1">Confirmed</p>
                <p className="text-2xl font-medium text-[#085041]">{loading ? "—" : confirmed}</p>
              </div>
              <div className="bg-[#FAEEDA] rounded-xl p-4">
                <p className="text-xs text-[#854F0B] mb-1">Pending</p>
                <p className="text-2xl font-medium text-[#633806]">{loading ? "—" : pending}</p>
              </div>
              <div className="bg-[#FCEBEB] rounded-xl p-4">
                <p className="text-xs text-red-400 mb-1">Cancelled</p>
                <p className="text-2xl font-medium text-red-700">{loading ? "—" : cancelled}</p>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && sessions.length === 0 && (
              <div className="bg-white border border-dashed border-gray-200 rounded-xl p-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">No sessions booked yet</p>
                <p className="text-xs text-gray-400 mb-4">Browse available tutors and book your first session.</p>
                <Link
                  href="/tutors"
                  className="bg-[#1D9E75] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#0F6E56] transition-colors"
                >
                  Browse tutors
                </Link>
              </div>
            )}

            {/* Table */}
            {!loading && sessions.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["Tutor name", "Subject", "Student email", "Session token", "Status", "Action"].map((h) => (
                          <th key={h} className="text-left text-xs font-medium text-gray-400 px-4 py-3 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {sessions.map((s) => {
                        const isCancelled = s.bookStatus === "cancelled";
                        const subjectClass = subjectColors[s.subject] || "bg-gray-100 text-gray-600";
                        const statusClass  = statusStyles[s.bookStatus] || "bg-gray-100 text-gray-600";

                        return (
                          <tr
                            key={s._id}
                            className={`hover:bg-gray-50 transition-colors ${isCancelled ? "opacity-50" : ""}`}
                          >
                            {/* Tutor */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${subjectClass}`}>
                                  {s.tutorName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-800 whitespace-nowrap">
                                  {s.tutorName}
                                </span>
                              </div>
                            </td>

                            {/* Subject */}
                            <td className="px-4 py-3">
                              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${subjectClass}`}>
                                {s.subject || "—"}
                              </span>
                            </td>

                            {/* Email */}
                            <td className="px-4 py-3 text-xs text-gray-400 max-w-[160px] truncate">
                              {s.studentEmail}
                            </td>

                            {/* Token */}
                            <td className="px-4 py-3 font-mono text-xs text-[#0F6E56]">
                              {isCancelled
                                ? <span className="line-through text-gray-400">{s.sessionToken}</span>
                                : s.sessionToken
                              }
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3">
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusClass}`}>
                                {s.bookStatus}
                              </span>
                            </td>

                            {/* Cancel */}
                            <td className="px-4 py-3">
                              <button
                                disabled={isCancelled}
                                onClick={() => setConfirmId(s._id)}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                                  isCancelled
                                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                    : "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                                }`}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
=======
<nav className="flex items-center gap-1.5 px-5 py-2.5 bg-white border-b border-zinc-200 text-xs text-zinc-500">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
    />
  </svg>

  <span className="hover:text-zinc-700 cursor-pointer transition-colors">
    Home
  </span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 18l6-6-6-6"
    />
  </svg>

  <span className="text-zinc-700 font-medium">
    My Sessions
  </span>
</nav>

        <section className="flex-1 px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              My Booked Sessions
            </h1>

            {MOCK_SESSIONS.length > 0 ? (
              <div className="grid gap-4">
                {MOCK_SESSIONS.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`${session.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}
                        >
                          {session.initials}
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {session.tutorName}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {session.subject}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {session.sessionToken}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                      Booked on {session.bookedOn}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-600 mb-4">
                  No booked sessions yet
                </p>

                <Link
                  href="/tutors"
                  className="text-[#1D9E75] hover:text-[#0F6E56] font-medium"
                >
                  Browse tutors →
                </Link>
              </div>
            )}
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
          </div>
        </section>

        <Footer />
      </div>
<<<<<<< HEAD

      {/* Cancel confirmation modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#04342C]/60 backdrop-blur-sm"
            onClick={() => setConfirmId(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                </svg>
              </div>
              <p className="text-base font-medium text-gray-800">Cancel this session?</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              This action cannot be undone. The booking status will be updated to cancelled.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep session
              </button>
              <button
                onClick={() => handleCancel(confirmId)}
                disabled={cancelling === confirmId}
                className="flex-1 bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {cancelling === confirmId ? "Cancelling…" : "Yes, cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
=======
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
    </PrivateRoute>
  );
}