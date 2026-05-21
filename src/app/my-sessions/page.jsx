"use client";

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
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

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
          </div>
        </section>

        <Footer />
      </div>
    </PrivateRoute>
  );
}