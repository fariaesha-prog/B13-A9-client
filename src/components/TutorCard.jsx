"use client";

import { useRouter } from "next/navigation";
<<<<<<< HEAD
import api from "@/services/api";

const subjectColors = {
  Mathematics: { bg: "bg-[#EEEDFE]", text: "text-[#3C3489]" },
  Physics: { bg: "bg-[#FAECE7]", text: "text-[#993C1D]" },
  Chemistry: { bg: "bg-[#FAEEDA]", text: "text-[#854F0B]" },
  Biology: { bg: "bg-[#FBEAF0]", text: "text-[#72243E]" },
  English: { bg: "bg-[#E1F5EE]", text: "text-[#0F6E56]" },
  "ICT / CS": { bg: "bg-[#E6F1FB]", text: "text-[#0C447C]" },
  Accounting: { bg: "bg-[#EAF3DE]", text: "text-[#3B6D11]" },
};

const modeColors = {
  Online: { bg: "bg-[#E1F5EE]", text: "text-[#0F6E56]" },
  Offline: { bg: "bg-[#FAECE7]", text: "text-[#993C1D]" },
  Both: { bg: "bg-[#E6F1FB]", text: "text-[#0C447C]" },
};

=======

const subjectColors = {
  Mathematics: { bg: "bg-[#EEEDFE]", text: "text-[#3C3489]" },
  Physics:     { bg: "bg-[#FAECE7]", text: "text-[#993C1D]" },
  Chemistry:   { bg: "bg-[#FAEEDA]", text: "text-[#854F0B]" },
  Biology:     { bg: "bg-[#FBEAF0]", text: "text-[#72243E]" },
  English:     { bg: "bg-[#E1F5EE]", text: "text-[#0F6E56]" },
  "ICT / CS":  { bg: "bg-[#E6F1FB]", text: "text-[#0C447C]" },
  Accounting:  { bg: "bg-[#EAF3DE]", text: "text-[#3B6D11]" },
};

const modeColors = {
  Online:  { bg: "bg-[#E1F5EE]", text: "text-[#0F6E56]" },
  Offline: { bg: "bg-[#FAECE7]", text: "text-[#993C1D]" },
  Both:    { bg: "bg-[#E6F1FB]", text: "text-[#0C447C]" },
};

// generates initials from a name
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TutorCard({ tutor }) {
  const router = useRouter();

  const {
    _id,
    tutorName,
<<<<<<< HEAD
    tutorPhoto,
=======
    photo,
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
    subject,
    availableDays,
    startTime,
    endTime,
    hourlyFee,
    totalSlot,
    teachingMode,
<<<<<<< HEAD
    institution,
=======
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
  } = tutor;

  const subjectStyle = subjectColors[subject] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };
<<<<<<< HEAD

=======
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
  const modeStyle = modeColors[teachingMode] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  const isFullyBooked = totalSlot === 0;

<<<<<<< HEAD
  const handleBook = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await api.post(
        "/bookings",
        {
          tutorId: _id,
          tutorName,
          subject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful!");
      router.refresh();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">
        {tutorPhoto ? (
          <img
            src={tutorPhoto}
            className="w-10 h-10 rounded-full object-cover"
            alt={tutorName}
          />
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${subjectStyle.bg} ${subjectStyle.text}`}>
            {getInitials(tutorName)}
          </div>
        )}

        <div>
          <p className="text-sm font-medium">{tutorName}</p>
          <p className="text-xs text-gray-400">{institution}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        <span className={`text-xs px-2 py-1 rounded-full ${subjectStyle.bg} ${subjectStyle.text}`}>
          {subject}
        </span>

        <span className={`text-xs px-2 py-1 rounded-full ${modeStyle.bg} ${modeStyle.text}`}>
=======
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow">

      {/* Header: avatar + name */}
      <div className="flex items-center gap-3">
        {photo ? (
          <img
            src={photo}
            alt={tutorName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-100"
          />
        ) : (
          <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-medium text-sm ${subjectStyle.bg} ${subjectStyle.text}`}>
            {getInitials(tutorName)}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-800 leading-tight">
            {tutorName}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{tutor.institution}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${subjectStyle.bg} ${subjectStyle.text}`}>
          {subject}
        </span>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${modeStyle.bg} ${modeStyle.text}`}>
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
          {teachingMode}
        </span>
      </div>

<<<<<<< HEAD
      {/* Info */}
      <div className="text-xs text-gray-500">
        {Array.isArray(availableDays)
          ? availableDays.join(", ")
          : availableDays}
        {" · "}
        {startTime} – {endTime}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">
          ৳{hourlyFee}/hr
        </span>

        <span className={isFullyBooked ? "text-red-500" : "text-green-600"}>
          {isFullyBooked ? "Fully booked" : `${totalSlot} slots left`}
        </span>
      </div>

      {/* Button */}
   <button
  onClick={() => {
    console.log("tutor id is:", _id);
    router.push(`/tutors/${_id}`);
  }}
  className="w-full text-sm font-medium py-2 rounded-lg bg-[#1D9E75] text-white hover:bg-[#0F6E56]"
>
  Book session
</button>
=======
      {/* Schedule + fee */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {availableDays} · {startTime} – {endTime}
        </span>
        <span className="text-gray-700 font-medium">৳{hourlyFee}/hr</span>
      </div>

      {/* Slot indicator */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className={isFullyBooked ? "text-red-500 font-medium" : "text-[#1D9E75]"}>
            {isFullyBooked ? "Fully booked" : `${totalSlot} slots left`}
          </span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isFullyBooked ? "bg-red-400" : "bg-[#1D9E75]"
            }`}
            style={{
              width: isFullyBooked
                ? "100%"
                : `${Math.min((totalSlot / 20) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={() => router.push(`/tutors/${_id}`)}
        disabled={isFullyBooked}
        className={`w-full text-sm font-medium py-2 rounded-lg transition-colors mt-auto ${
          isFullyBooked
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#1D9E75] text-white hover:bg-[#0F6E56]"
        }`}
      >
        {isFullyBooked ? "No slots available" : "Book session"}
      </button>
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
    </div>
  );
}