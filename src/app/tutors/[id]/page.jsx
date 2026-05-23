"use client";

<<<<<<< HEAD
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

function generateToken(tutorName) {
  const initials = tutorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const num = Math.floor(1000 + Math.random() * 9000);
  return `MQ-${new Date().getFullYear()}-${initials}-${num}`;
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

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [tutor, setTutor]             = useState(null);
  const [loading, setLoading]         = useState(true);
  const [booking, setBooking]         = useState(false);
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone]             = useState("");
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
        setSessionToken(generateToken(res.data.tutorName));
        setLoading(false);
      })
      .catch(() => {
        toast.error("Tutor not found");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user?.displayName) setStudentName(user.displayName);
  }, [user]);

  async function handleBook(e) {
    e.preventDefault();

    if (tutor.totalSlot === 0) {
      toast.error("No available slots left.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sessionDate = new Date(tutor.sessionStartDate);
    sessionDate.setHours(0, 0, 0, 0);

    if (today < sessionDate) {
      toast.error("Booking is not available yet for this tutor.");
      return;
    }

    setBooking(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          tutorId:      tutor._id,
          tutorName:    tutor.tutorName,
          studentName,
          phone,
          studentEmail: user.email,
          sessionToken,
          bookStatus:   "Pending confirmation",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Session booked successfully!");

      const updated = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`
      );
      setTutor(updated.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div className="lg:col-span-2">
          <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />
        </div>
=======
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
  check: "M20 6 9 17l-5-5",
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
    institution:
      "Bangladesh University of Engineering and Technology",
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
function Breadcrumb() {
  return (
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
        All Tutors
      </span>
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
  const percent =
    (session.filledSlots / session.totalSlots) * 100;

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
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
      </div>
    );
  }

<<<<<<< HEAD
  if (!tutor) return null;

  const subjectClass  = subjectColors[tutor.subject] || "bg-gray-100 text-gray-600";
  const modeClass     = modeColors[tutor.teachingMode] || "bg-gray-100 text-gray-600";
  const isFullyBooked = tutor.totalSlot === 0;
  const slotPercent   = Math.min(
    (tutor.totalSlot / (tutor.originalSlot || 20)) * 100,
    100
  );

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/10 transition";
  const readOnlyClass =
    "w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>›</span>
        <Link href="/tutors" className="hover:text-gray-600">Tutors</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">{tutor.tutorName}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* ── LEFT ── */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Profile card */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex gap-4 items-start">
              {tutor.photo ? (
                <img
                  src={tutor.photo}
                  alt={tutor.tutorName}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-gray-100"
                />
              ) : (
                <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-medium ${subjectClass}`}>
                  {tutor.tutorName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-lg font-medium text-gray-800">
                    {tutor.tutorName}
                  </h1>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${modeClass}`}>
                    {tutor.teachingMode}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${subjectClass}`}>
                    {tutor.subject}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {tutor.institution} · {tutor.location}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>⭐ {tutor.rating || "4.9"} rating</span>
                  <span>🎓 {tutor.experience} exp</span>
                  <span className={`font-medium ${isFullyBooked ? "text-red-500" : "text-[#1D9E75]"}`}>
                    🎫 {isFullyBooked ? "Fully booked" : `${tutor.totalSlot} slots left`}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-medium text-[#1D9E75]">৳{tutor.hourlyFee}</p>
                <p className="text-xs text-gray-400">per hour</p>
              </div>
            </div>
          </div>

          {/* Session details */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-sm font-medium text-gray-800 mb-3">Session details</p>
            <div className="divide-y divide-gray-50">
              {[
                { label: "Available days", value: tutor.availableDays },
                { label: "Time slot",      value: `${tutor.startTime} – ${tutor.endTime}` },
                { label: "Session starts", value: new Date(tutor.sessionStartDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
                { label: "Institution",    value: tutor.institution },
                { label: "Location",       value: tutor.location },
                { label: "Teaching mode",  value: tutor.teachingMode },
                { label: "Total slots",    value: `${tutor.totalSlot} / ${tutor.originalSlot || 20} remaining` },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 py-2.5 text-xs">
                  <span className="text-gray-400 min-w-[120px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span className="text-gray-800 font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slot bar */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Slot availability</span>
              <span className="text-sm font-medium text-[#1D9E75]">
                {tutor.totalSlot} / {tutor.originalSlot || 20}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isFullyBooked ? "bg-red-400" : "bg-[#1D9E75]"}`}
                style={{ width: `${slotPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {isFullyBooked
                ? "This session is fully booked. You can't join at the moment."
                : `${(tutor.originalSlot || 20) - tutor.totalSlot} seats have been filled — book soon to secure your spot.`}
            </p>
          </div>

        </div>

        {/* ── RIGHT: booking form ── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-20">

            <p className="text-base font-medium text-gray-800 mb-0.5">
              Book a session
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Fill in your details below
            </p>
            <div className="border-t border-gray-100 mb-4" />

            <form onSubmit={handleBook} className="flex flex-col gap-3">

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Your name
                </label>
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Phone number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="01XXXXXXXXX"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Your email{" "}
                  <span className="text-[#1D9E75] font-normal">(auto-filled)</span>
                </label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className={readOnlyClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Tutor ID{" "}
                  <span className="text-[#1D9E75] font-normal">(auto-filled)</span>
                </label>
                <input
                  value={`#TUT-${tutor._id?.slice(-5).toUpperCase()}`}
                  readOnly
                  className={`${readOnlyClass} font-mono`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Tutor name{" "}
                  <span className="text-[#1D9E75] font-normal">(auto-filled)</span>
                </label>
                <input
                  value={tutor.tutorName}
                  readOnly
                  className={readOnlyClass}
                />
              </div>

              {/* Token */}
              <div className="bg-[#E1F5EE] border border-[#5DCAA5] rounded-lg p-3 flex items-center gap-3">
                <svg className="w-8 h-8 text-[#0F6E56] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5z" />
                </svg>
                <div>
                  <p className="text-xs font-medium text-[#085041]">
                    Session token (auto-generated)
                  </p>
                  <p className="text-sm text-[#0F6E56] font-mono mt-0.5">
                    {sessionToken}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Status:</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FAEEDA] text-[#633806]">
                  Pending confirmation
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={booking || isFullyBooked}
                className={`w-full text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1 disabled:opacity-60 ${
                  isFullyBooked
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#1D9E75] text-white hover:bg-[#0F6E56]"
                }`}
              >
                {booking ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Confirming…
                  </>
                ) : isFullyBooked ? (
                  "No slots available"
                ) : (
                  "Confirm booking"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Slots decrease immediately after booking. No refunds after 24h.
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
=======
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Book a Session
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Fill your information below
      </p>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl transition"
      >
        {loading ? "Confirming..." : "Confirm Booking"}
      </button>
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
      <Breadcrumb />

      <main className="min-h-screen bg-gray-50">
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
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
}