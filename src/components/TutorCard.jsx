"use client";

import { useRouter } from "next/navigation";

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
    photo,
    subject,
    availableDays,
    startTime,
    endTime,
    hourlyFee,
    totalSlot,
    teachingMode,
  } = tutor;

  const subjectStyle = subjectColors[subject] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };
  const modeStyle = modeColors[teachingMode] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  const isFullyBooked = totalSlot === 0;

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
          {teachingMode}
        </span>
      </div>

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
    </div>
  );
}