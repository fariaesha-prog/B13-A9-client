"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    subjectColor: "bg-blue-50 text-blue-700 border-blue-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-NK-1181",
    bookedOn: "15 May 2025",
    status: "Confirmed",
  },
  {
    id: "3",
    tutorName: "Tamim Ansari",
    initials: "TA",
    color: "bg-orange-500",
    subject: "Chemistry",
    subjectColor:
      "bg-orange-50 text-orange-700 border-orange-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-TA-5506",
    bookedOn: "20 May 2025",
    status: "Pending",
  },
  {
    id: "4",
    tutorName: "Shafiq Hossain",
    initials: "SH",
    color: "bg-cyan-600",
    subject: "ICT / CS",
    subjectColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-SH-7721",
    bookedOn: "10 May 2025",
    status: "Confirmed",
  },
  {
    id: "5",
    tutorName: "Mitu Jahan",
    initials: "MJ",
    color: "bg-pink-600",
    subject: "Biology",
    subjectColor: "bg-pink-50 text-pink-700 border-pink-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-MJ-2247",
    bookedOn: "21 May 2025",
    status: "Pending",
  },
  {
    id: "6",
    tutorName: "Farhan Islam",
    initials: "FI",
    color: "bg-zinc-500",
    subject: "English",
    subjectColor: "bg-zinc-100 text-zinc-700 border-zinc-200",
    studentEmail: "arif@example.com",
    sessionToken: "MQ-2025-FI-3398",
    bookedOn: "5 May 2025",
    status: "Cancelled",
  },
];

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Confirmed:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending:
      "bg-amber-50 text-amber-700 border border-amber-200",
    Cancelled:
      "bg-red-50 text-red-700 border border-red-200",
  };

  const dot = {
    Confirmed: "bg-emerald-500",
    Pending: "bg-amber-500",
    Cancelled: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        map[status] ?? map.Pending
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          dot[status] ?? dot.Pending
        }`}
      />
      {status}
    </span>
  );
}

// ── Cancel modal ──────────────────────────────────────────────────────────────
function CancelModal({ session, onConfirm, onClose }) {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm bg-white border border-zinc-200 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-base font-bold text-zinc-900 text-center mb-2">
          Cancel this session?
        </h3>

        <p className="text-sm text-zinc-500 text-center mb-6 leading-relaxed">
          You&apos;re about to cancel your session with{" "}
          <span className="text-zinc-900 font-medium">
            {session.tutorName}
          </span>{" "}
          (token{" "}
          <span className="font-mono text-emerald-600 text-xs">
            {session.sessionToken}
          </span>
          ). This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            Keep session
          </button>

          <button
            onClick={() => onConfirm(session.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="border border-dashed border-zinc-300 rounded-2xl py-14 flex flex-col items-center justify-center gap-3 text-center mt-6 bg-white">
      <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>

      <p className="text-base font-semibold text-zinc-800">
        No sessions booked yet
      </p>

      <p className="text-sm text-zinc-500 max-w-xs">
        Browse available tutors and book your first session to get started.
      </p>

      <Link
        href="/tutors"
        className="mt-2 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
      >
        Browse tutors
      </Link>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  labelColor,
  valueColor,
  cardBg,
  borderColor,
}) {
  return (
    <div
      className={`${cardBg} ${borderColor} border rounded-2xl px-5 py-4 shadow-sm`}
    >
      <p className={`text-xs font-medium mb-1 ${labelColor}`}>
        {label}
      </p>

      <p
        className={`text-4xl font-extrabold tracking-tight ${valueColor}`}
      >
        {value}
      </p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MyBookedSessions() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [cancelTarget, setCancelTarget] = useState(null);

  const confirmed = sessions.filter(
    (s) => s.status === "Confirmed"
  ).length;

  const pending = sessions.filter(
    (s) => s.status === "Pending"
  ).length;

  const cancelled = sessions.filter(
    (s) => s.status === "Cancelled"
  ).length;

  const handleCancelConfirm = (id) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Cancelled" } : s
      )
    );

    setCancelTarget(null);
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8fafc] text-zinc-800 font-sans">
        <Navbar active="sessions" />

        {/* Breadcrumb */}
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
            My Booked Sessions
          </span>
        </nav>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                My booked sessions
              </h1>

              <p className="text-sm text-zinc-500 mt-0.5">
                All sessions booked under your account.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-700 shadow-sm shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span className="hidden sm:inline">
                arif@example.com
              </span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
            <StatCard
              label="Total booked"
              value={sessions.length}
              labelColor="text-zinc-500"
              valueColor="text-zinc-900"
              cardBg="bg-white"
              borderColor="border-zinc-200"
            />

            <StatCard
              label="Confirmed"
              value={confirmed}
              labelColor="text-emerald-600"
              valueColor="text-emerald-700"
              cardBg="bg-emerald-50"
              borderColor="border-emerald-200"
            />

            <StatCard
              label="Pending"
              value={pending}
              labelColor="text-amber-600"
              valueColor="text-amber-700"
              cardBg="bg-amber-50"
              borderColor="border-amber-200"
            />

            <StatCard
              label="Cancelled"
              value={cancelled}
              labelColor="text-red-600"
              valueColor="text-red-700"
              cardBg="bg-red-50"
              borderColor="border-red-200"
            />
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  {[
                    "Tutor name",
                    "Subject",
                    "Student email",
                    "Session token",
                    "Booked on",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest first:pl-5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {sessions.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="pl-5 pr-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-[11px] font-bold text-white`}
                        >
                          {s.initials}
                        </div>

                        <span className="font-medium text-zinc-800 whitespace-nowrap">
                          {s.tutorName}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.subjectColor}`}
                      >
                        {s.subject}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-zinc-500 text-xs">
                      {s.studentEmail}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md tracking-wide">
                        {s.sessionToken}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-zinc-500 whitespace-nowrap text-xs">
                      {s.bookedOn}
                    </td>

                    <td className="px-4 py-3.5">
                      <StatusBadge status={s.status} />
                    </td>

                    <td className="px-4 py-3.5">
                      {s.status !== "Cancelled" ? (
                        <button
                          onClick={() => setCancelTarget(s)}
                          className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-red-50 border border-zinc-200 hover:border-red-200 text-zinc-700 hover:text-red-600 transition-all"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-xs text-zinc-400 px-3 py-1.5">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 mt-4">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {s.initials}
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-800 text-sm">
                        {s.tutorName}
                      </p>

                      <span
                        className={`inline-flex items-center px-2 py-px rounded-full text-xs font-semibold border ${s.subjectColor} mt-0.5`}
                      >
                        {s.subject}
                      </span>
                    </div>
                  </div>

                  <StatusBadge status={s.status} />
                </div>

                <div className="space-y-1.5 text-xs text-zinc-500 border-t border-zinc-100 pt-3">
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="text-zinc-700">
                      {s.studentEmail}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Token</span>
                    <span className="font-mono text-emerald-700">
                      {s.sessionToken}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Booked on</span>
                    <span className="text-zinc-700">
                      {s.bookedOn}
                    </span>
                  </div>
                </div>

                {s.status !== "Cancelled" && (
                  <button
                    onClick={() => setCancelTarget(s)}
                    className="mt-3 w-full text-xs font-medium py-2 rounded-lg bg-zinc-100 hover:bg-red-50 border border-zinc-200 hover:border-red-200 text-zinc-700 hover:text-red-600 transition-all"
                  >
                    Cancel session
                  </button>
                )}
              </div>
            ))}
          </div>

          {sessions.length === 0 && <EmptyState />}
        </div>

        {/* Cancel modal */}
        <CancelModal
          session={cancelTarget}
          onConfirm={handleCancelConfirm}
          onClose={() => setCancelTarget(null)}
        />
      </div>

      <Footer />
    </>
  );
}