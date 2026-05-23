"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthContext } from "@/context/AuthContext";

function generateToken(tutorName) {
  const initials = tutorName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const num = Math.floor(1000 + Math.random() * 9000);
  return `MQ-${new Date().getFullYear()}-${initials}-${num}`;
}

const subjectColors = {
  Mathematics: "bg-[#EEEDFE] text-[#3C3489]",
  Physics: "bg-[#FAECE7] text-[#993C1D]",
  Chemistry: "bg-[#FAEEDA] text-[#854F0B]",
  Biology: "bg-[#FBEAF0] text-[#72243E]",
  English: "bg-[#E1F5EE] text-[#0F6E56]",
  "ICT / CS": "bg-[#E6F1FB] text-[#0C447C]",
  Accounting: "bg-[#EAF3DE] text-[#3B6D11]",
};

const modeColors = {
  Online: "bg-[#E1F5EE] text-[#0F6E56]",
  Offline: "bg-[#FAECE7] text-[#993C1D]",
  Both: "bg-[#E6F1FB] text-[#0C447C]",
};

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get(`/tutors/${id}`)
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
    if (tutor.totalSlot === 0) { toast.error("No available slots left."); return; }

    setBooking(true);
    try {
      await api.post("/bookings", {
        tutorId: tutor._id,
        tutorName: tutor.tutorName,
        studentName,
        phone,
        studentEmail: user.email,
        sessionToken,
        bookStatus: "Pending confirmation",
      });
      toast.success("Session booked successfully!");
      const updated = await api.get(`/tutors/${id}`);
      setTutor(updated.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          </div>
          <div className="lg:col-span-2">
            <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!tutor) return null;

  const subjectClass = subjectColors[tutor.subject] || "bg-gray-100 text-gray-600";
  const modeClass = modeColors[tutor.teachingMode] || "bg-gray-100 text-gray-600";
  const isFullyBooked = tutor.totalSlot === 0;
  const slotPercent = Math.min((tutor.totalSlot / (tutor.originalSlot || 20)) * 100, 100);
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/10 transition";
  const readOnlyClass = "w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed";

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>›</span>
          <Link href="/tutors" className="hover:text-gray-600">Tutors</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{tutor.tutorName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex gap-4 items-start">
                {tutor.tutorPhoto ? (
                  <img src={tutor.tutorPhoto} alt={tutor.tutorName} className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                ) : (
                  <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-medium ${subjectClass}`}>
                    {tutor.tutorName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-lg font-medium text-gray-800">{tutor.tutorName}</h1>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${modeClass}`}>{tutor.teachingMode}</span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${subjectClass}`}>{tutor.subject}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{tutor.institution}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className={`font-medium ${isFullyBooked ? "text-red-500" : "text-[#1D9E75]"}`}>
                      {isFullyBooked ? "Fully booked" : `${tutor.totalSlot} slots left`}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-medium text-[#1D9E75]">৳{tutor.hourlyFee}</p>
                  <p className="text-xs text-gray-400">per hour</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="text-sm font-medium text-gray-800 mb-3">Session details</p>
              <div className="divide-y divide-gray-50">
                {[
                  { label: "Available days", value: tutor.availableDays },
                  { label: "Time slot", value: `${tutor.startTime} – ${tutor.endTime}` },
                  { label: "Institution", value: tutor.institution },
                  { label: "Teaching mode", value: tutor.teachingMode },
                  { label: "Total slots", value: `${tutor.totalSlot} remaining` },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3 py-2.5 text-xs">
                    <span className="text-gray-400 min-w-[120px] flex-shrink-0">{row.label}</span>
                    <span className="text-gray-800 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Slot availability</span>
                <span className="text-sm font-medium text-[#1D9E75]">{tutor.totalSlot} / {tutor.originalSlot || 20}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${isFullyBooked ? "bg-red-400" : "bg-[#1D9E75]"}`} style={{ width: `${slotPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-20">
              <p className="text-base font-medium text-gray-800 mb-0.5">Book a session</p>
              <p className="text-xs text-gray-400 mb-4">Fill in your details below</p>
              <div className="border-t border-gray-100 mb-4" />
              <form onSubmit={handleBook} className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Your name</label>
                  <input value={studentName} onChange={(e) => setStudentName(e.target.value)} required placeholder="Enter your name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="01XXXXXXXXX" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Your email <span className="text-[#1D9E75] font-normal">(auto-filled)</span></label>
                  <input value={user?.email || ""} readOnly className={readOnlyClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Tutor name <span className="text-[#1D9E75] font-normal">(auto-filled)</span></label>
                  <input value={tutor.tutorName} readOnly className={readOnlyClass} />
                </div>
                <div className="bg-[#E1F5EE] border border-[#5DCAA5] rounded-lg p-3">
                  <p className="text-xs font-medium text-[#085041]">Session token (auto-generated)</p>
                  <p className="text-sm text-[#0F6E56] font-mono mt-0.5">{sessionToken}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Status:</span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FAEEDA] text-[#633806]">Pending confirmation</span>
                </div>
                <button
                  type="submit"
                  disabled={booking || isFullyBooked}
                  className={`w-full text-sm font-medium py-2.5 rounded-lg transition-colors mt-1 disabled:opacity-60 ${isFullyBooked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#1D9E75] text-white hover:bg-[#0F6E56]"}`}
                >
                  {booking ? "Confirming…" : isFullyBooked ? "No slots available" : "Confirm booking"}
                </button>
                <p className="text-xs text-gray-400 text-center">Slots decrease immediately after booking.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}