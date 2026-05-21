"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const icons = {
  calendar:
    "M8 2v3m8-3v3M3 9h18M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
  clock:
    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v5l3 3",
  building: "M3 21h18M9 21V7l6-4v18M3 21V11l6-4",
  pin:
    "M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  laptop:
    "M4 16V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10M2 20h20",
  grid:
    "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  star:
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check: "M20 6 9 17l-5-5",
  qr:
    "M3 3h6v6H3zm0 12h6v6H3zm12-12h6v6h-6zM9 9h1v1H9zm5 0h1v1h-1zm2 2h1v1h-1zm-4 0h1v1h-1zm2 2h1v1h-1zm-4 4h1v1h-1zm4 0h1v1h-1zm2 2h1v1h-1zm-4 0h1v1h-1zm2-6h1v1h-1zm-2 2h1v1h-1zm2 0h1v1h-1z",
  home: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z",
  chevron: "M9 18l6-6-6-6",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m22 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const tutorData = {
  name: "Rakib Sultani",
  initials: "RS",
  status: "Online",
  subject: "Mathematics",
  university: "BUET",
  location: "Dhaka, Bangladesh",
  rating: 4.9,
  experience: 5,
  pricePerHour: 500,
  slotsLeft: 8,
  session: {
    availableDays: "Sun – Thu",
    timeSlot: "5:00 PM – 8:00 PM",
    startDate: "1 Jun 2025",
    institution: "Bangladesh University of Engineering and Technology",
    location: "Mirpur, Dhaka",
    teachingMode: "Online",
    totalSlots: 20,
    filledSlots: 12,
  },
};

const userPrefill = {
  name: "Arif Rahman",
  phone: "01712345678",
  email: "arif@example.com",
  tutorId: "#TUT-00423",
  sessionToken: "MQ-2025-RS-8814",
};

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ tutor }) {
  return (
    <nav className="flex items-center gap-2 px-5 py-4 bg-white border-b border-gray-200 text-sm text-gray-500">
      <span>Home</span>
      <Icon d={icons.chevron} size={14} />
      <span>Tutors</span>
      <Icon d={icons.chevron} size={14} />
      <span className="text-gray-800 font-medium">{tutor.name}</span>
    </nav>
  );
}

// ─── Tutor Card ───────────────────────────────────────────────────────────────
function TutorCard({ tutor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            {tutor.initials}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">
                {tutor.name}
              </h1>

              <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                {tutor.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              {tutor.subject}
            </p>

            <p className="text-sm text-gray-500">
              {tutor.university} • {tutor.location}
            </p>

            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-amber-500">
                ⭐ {tutor.rating}
              </span>

              <span className="text-gray-500">
                {tutor.experience} years exp
              </span>
            </div>

            <p className="mt-2 text-emerald-600 text-sm font-medium">
              {tutor.slotsLeft} slots left
            </p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-3xl font-bold text-emerald-600">
            ৳{tutor.pricePerHour}
          </h2>
          <p className="text-sm text-gray-400">per hour</p>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Row ───────────────────────────────────────────────────────────────
function DetailRow({ iconPath, label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-3">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon d={iconPath} size={15} />
        <span>{label}</span>
      </div>

      <span className="text-gray-800 font-medium">
        {value}
      </span>
    </div>
  );
}

// ─── Session Details ──────────────────────────────────────────────────────────
function SessionDetails({ session }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Session Details
      </h2>

      <DetailRow
        iconPath={icons.calendar}
        label="Available Days"
        value={session.availableDays}
      />

      <DetailRow
        iconPath={icons.clock}
        label="Time Slot"
        value={session.timeSlot}
      />

      <DetailRow
        iconPath={icons.calendar}
        label="Start Date"
        value={session.startDate}
      />

      <DetailRow
        iconPath={icons.building}
        label="Institution"
        value={session.institution}
      />

      <DetailRow
        iconPath={icons.pin}
        label="Location"
        value={session.location}
      />

      <DetailRow
        iconPath={icons.laptop}
        label="Teaching Mode"
        value={session.teachingMode}
      />
    </div>
  );
}

// ─── Slot Availability ────────────────────────────────────────────────────────
function SlotAvailability({ session }) {
  const remaining = session.totalSlots - session.filledSlots;
  const percent = (session.filledSlots / session.totalSlots) * 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between mb-3">
        <span className="text-gray-600">Slot Availability</span>

        <span className="font-semibold text-emerald-600">
          {remaining}/{session.totalSlots}
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {session.filledSlots} seats already filled.
      </p>
    </div>
  );
}

// ─── Booking Form ─────────────────────────────────────────────────────────────
function BookingForm({ tutor, prefill }) {
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setLoading(false);
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon d={icons.check} size={24} />
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          Booking Confirmed!
        </h2>

        <p className="text-gray-500 mt-2">
          Your session has been booked successfully.
        </p>

        <p className="mt-4 text-emerald-600 font-mono">
          {prefill.sessionToken}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Book a Session
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Fill your information below
      </p>

      <div className="space-y-4">
        <input
          type="text"
          defaultValue={prefill.name}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
        />

        <input
          type="text"
          defaultValue={prefill.phone}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
        />

        <input
          type="email"
          defaultValue={prefill.email}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
        />

        <input
          type="text"
          readOnly
          value={prefill.tutorId}
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          readOnly
          value={tutor.name}
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
        />

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <p className="text-sm text-emerald-600">
            Session Token
          </p>

          <h3 className="font-mono text-emerald-700 mt-1">
            {prefill.sessionToken}
          </h3>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl transition"
        >
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TutorPage() {
  const tutor = tutorData;
  const prefill = userPrefill;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Breadcrumb tutor={tutor} />

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side */}
          <div className="space-y-5">
            <TutorCard tutor={tutor} />
            <SessionDetails session={tutor.session} />
            <SlotAvailability session={tutor.session} />
          </div>

          {/* Right Side */}
          <div>
            <BookingForm tutor={tutor} prefill={prefill} />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}