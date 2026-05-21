"use client";

import { useRouter } from "next/navigation";

const subjects = [
  {
    label: "Mathematics",
    bg: "bg-[#EEEDFE]",
    text: "text-[#3C3489]",
    hover: "hover:bg-[#CECBF6]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    ),
  },
  {
    label: "Physics",
    bg: "bg-[#FAECE7]",
    text: "text-[#993C1D]",
    hover: "hover:bg-[#F5C4B3]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0M12 3v1m0 16v1M3 12h1m16 0h1" />
      </svg>
    ),
  },
  {
    label: "Chemistry",
    bg: "bg-[#FAEEDA]",
    text: "text-[#854F0B]",
    hover: "hover:bg-[#FAC775]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75v7.06L5.318 18.5A1.5 1.5 0 0 0 6.623 21h10.754a1.5 1.5 0 0 0 1.305-2.25L14.25 10.81V3.75m-4.5 0h4.5m-4.5 0H9" />
      </svg>
    ),
  },
  {
    label: "Biology",
    bg: "bg-[#FBEAF0]",
    text: "text-[#72243E]",
    hover: "hover:bg-[#F4C0D1]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 4-3 6-3 9a3 3 0 0 0 6 0c0-3-1.5-5-3-9zm0 0v18m-4-6h8" />
      </svg>
    ),
  },
  {
    label: "English",
    bg: "bg-[#E1F5EE]",
    text: "text-[#0F6E56]",
    hover: "hover:bg-[#9FE1CB]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
      </svg>
    ),
  },
  {
    label: "ICT / CS",
    bg: "bg-[#E6F1FB]",
    text: "text-[#0C447C]",
    hover: "hover:bg-[#B5D4F4]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    label: "Accounting",
    bg: "bg-[#EAF3DE]",
    text: "text-[#3B6D11]",
    hover: "hover:bg-[#C0DD97]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25V18zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25V18zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zm0 3h.008v.008H14.25V18zm3-9h.008v.008H17.25V9zm0 3h.008v.008H17.25v-.008zm0 3h.008v.008H17.25v-.008zm0 3h.008v.008H17.25V18zm-12-9h.008v.008H5.25V9zm0 3h.008v.008H5.25v-.008zm0 3h.008v.008H5.25v-.008zm0 3h.008v.008H5.25V18z" />
      </svg>
    ),
  },
  {
    label: "More",
    bg: "bg-gray-100",
    text: "text-gray-400",
    hover: "hover:bg-gray-200",
    isMore: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
      </svg>
    ),
  },
];

export default function PopularSubjects() {
  const router = useRouter();

  function handleClick(subject) {
    if (subject.isMore) {
      router.push("/tutors");
    } else {
      // passes subject as a query param so Tutors page can pre-filter
      router.push(`/tutors?subject=${encodeURIComponent(subject.label)}`);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Popular subjects
        </h2>
        <p className="text-sm text-gray-400">
          Tap any subject to find available tutors
        </p>
      </div>

      {/* Subject grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map((s) => (
          <button
            key={s.label}
            onClick={() => handleClick(s)}
            className={`
              ${s.bg} ${s.text} ${s.hover}
              rounded-xl p-4 flex flex-col items-center gap-2.5
              transition-colors cursor-pointer border-0 w-full
              ${s.isMore ? "border border-dashed border-gray-300" : ""}
            `}
          >
            <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
              {s.icon}
            </div>
            <span className="text-xs font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}