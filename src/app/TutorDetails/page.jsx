import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

// ── generate session token ──
function generateToken(tutorName, id) {
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

const detailRows = (tutor) => [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25" />
      </svg>
    ),
    label: "Available days",
    value: tutor.availableDays,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    label: "Time slot",
    value: `${tutor.startTime} – ${tutor.endTime}`,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    label: "Session starts",
    value: new Date(tutor.sessionStartDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    label: "Institution",
    value: tutor.institution,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
      </svg>
    ),
    label: "Location",
    value: tutor.location,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
    label: "Teaching mode",
    value: tutor.teachingMode,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197" />
      </svg>
    ),
    label: "Total slots",
    value: `${tutor.totalSlot} / ${tutor.originalSlot || 20} remaining`,
  },
];

export default function TutorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [tutor, setTutor]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [booking, setBooking]   = useState(false);

  // form fields
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone]             = useState("");

  // auto-generated token — stable per page load
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
        setSessionToken(generateToken(res.data.tutorName, res.data._id));
        setLoading(false);
      })
      .catch(() => {
        toast.error("Tutor not found");
        setLoading(false);
      });
  }, [id]);

  // pre-fill student name from auth
  useEffect(() => {
    if (user?.displayName) setStudentName(user.displayName);
  }, [user]);

  // ── booking logic ──
  async function handleBook(e) {
    e.preventDefault();

    // 1. slot check
    if (tutor.totalSlot === 0) {
      toast.error("No available slots left.");
      return;
    }

    // 2. date check
    const today       = new Date();
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
        `${import.meta.env.VITE_API_URL}/bookings`,
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
      // refresh tutor so slot count updates
      const updated = await axios.get(
        `${import.meta.env.VITE_API_URL}/tutors/${id}`
      );
      setTutor(updated.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  }

  // ── loading ──
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
      </div>
    );
  }

  if (!tutor) return null;

  const subjectClass =
    subjectColors[tutor.subject] || "bg-gray-100 text-gray-600";
  const modeClass =
    modeColors[tutor.teachingMode] || "bg-gray-100 text-gray-600";
  const isFullyBooked = tutor.totalSlot === 0;
  const slotPercent   = Math.min(
    ((tutor.totalSlot / (tutor.originalSlot || 20)) * 100),
    100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-600">Home</Link>
        <span>›</span>
        <Link to="/tutors" className="hover:text-gray-600">Tutors</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">{tutor.tutorName}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* ════════════════════════════════
            LEFT — tutor info
        ════════════════════════════════ */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Profile card */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex gap-4 items-start">

              {/* Avatar */}
              {tutor.photo ? (
                <img
                  src={tutor.photo}
                  alt={tutor.tutorName}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-gray-100"
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-medium ${subjectClass}`}
                >
                  {tutor.tutorName
                    ?.split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}

              {/* Name + badges + fee */}
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

              {/* Fee */}
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-medium text-[#1D9E75]">
                  ৳{tutor.hourlyFee}
                </p>
                <p className="text-xs text-gray-400">per hour</p>
              </div>
            </div>
          </div>

          {/* Session details table */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Session details
            </p>
            <div className="divide-y divide-gray-50">
              {detailRows(tutor).map((row) => (
                <div
                  key={row.label}
                  className="flex items-start gap-3 py-2.5 text-sm"
                >
                  <span className="text-gray-400 flex-shrink-0 mt-0.5">
                    {row.icon}
                  </span>
                  <span className="text-gray-400 min-w-[120px] flex-shrink-0 text-xs">
                    {row.label}
                  </span>
                  <span className="text-gray-800 font-medium text-xs">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Slot progress bar */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Slot availability</span>
              <span className="text-sm font-medium text-[#1D9E75]">
                {tutor.totalSlot} / {tutor.originalSlot || 20}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isFullyBooked ? "bg-red-400" : "bg-[#1D9E75]"
                }`}
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

        {/* ════════════════════════════════
            RIGHT — booking form
        ════════════════════════════════ */}
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

              {/* Student name */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Your name
                </label>
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/10 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Phone number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/10 transition"
                />
              </div>

              {/* Email — auto filled */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Your email{" "}
                  <span className="text-[#1D9E75] font-normal">
                    (auto-filled)
                  </span>
                </label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Tutor ID — auto filled */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Tutor ID{" "}
                  <span className="text-[#1D9E75] font-normal">
                    (auto-filled)
                  </span>
                </label>
                <input
                  value={`#TUT-${tutor._id?.slice(-5).toUpperCase()}`}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed font-mono"
                />
              </div>

              {/* Tutor name — auto filled */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Tutor name{" "}
                  <span className="text-[#1D9E75] font-normal">
                    (auto-filled)
                  </span>
                </label>
                <input
                  value={tutor.tutorName}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Session token */}
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

              {/* Status badge */}
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
                className={`w-full text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1 ${
                  isFullyBooked
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#1D9E75] text-white hover:bg-[#0F6E56]"
                } disabled:opacity-60`}
              >
                {booking ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Confirming…
                  </>
                ) : isFullyBooked ? (
                  "No slots available"
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75" />
                    </svg>
                    Confirm booking
                  </>
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
}