"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";

const MOCK_TUTORS = [
  {
    id: "1",
    tutorName: "Rakib Sultani",
    subject: "Mathematics",
    fee: 1200,
    slots: 5,
    mode: "Online",
  },
  {
    id: "2",
    tutorName: "Nazia Khatun",
    subject: "Physics",
    fee: 1000,
    slots: 2,
    mode: "Offline",
  },
];

export default function MyTutors() {
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
    My Tutors
  </span>
</nav>

        <section className="flex-1 px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              My Tutors
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Total Tutors</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  {MOCK_TUTORS.length}
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Active Slots</p>
                <h2 className="text-2xl font-bold text-emerald-600">
                  {MOCK_TUTORS.reduce((a, b) => a + b.slots, 0)}
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Online Tutors</p>
                <h2 className="text-2xl font-bold text-blue-600">
                  {
                    MOCK_TUTORS.filter(
                      (t) => t.mode === "Online"
                    ).length
                  }
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Offline Tutors</p>
                <h2 className="text-2xl font-bold text-orange-600">
                  {
                    MOCK_TUTORS.filter(
                      (t) => t.mode === "Offline"
                    ).length
                  }
                </h2>
              </div>
            </div>

            {/* Tutor cards */}
            <div className="grid gap-4">
              {MOCK_TUTORS.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tutor.tutorName}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {tutor.subject}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-emerald-600 font-bold">
                        ৳{tutor.fee}/hr
                      </p>

                      <p className="text-sm text-gray-500">
                        {tutor.slots} slots left
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tutor.mode === "Online"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {tutor.mode}
                    </span>

                    <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                      Edit
                    </button>

                    <button className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PrivateRoute>
  );
}