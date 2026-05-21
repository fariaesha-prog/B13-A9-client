"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// ── Day pill ──────────────────────────────────────────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Input wrapper ─────────────────────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-zinc-600">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="text-[11px] text-zinc-400">{hint}</p>}
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:border-emerald-500 transition-colors pr-9 cursor-pointer"
      >
        {children}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function SectionCard({ icon, title, children }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
          {icon}
        </div>

        <h2 className="text-sm font-semibold text-zinc-800">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

// ── Success toast ─────────────────────────────────────────────────────────────
function SuccessToast({ name }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-white border border-emerald-200 rounded-xl px-4 py-3 flex items-start gap-3 shadow-2xl">
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-700">
            Tutor added successfully!
          </p>

          <p className="text-xs text-zinc-500 mt-0.5">
            {name} has been listed on MediQueue. Students can now
            book sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AddTutor() {
  const [form, setForm] = useState({
    tutorName: "Rakib Sultani",
    subject: "Mathematics",
    photoUrl: "https://i.ibb.co/xyz/tutor-photo.jpg",
    selectedDays: ["Sun", "Mon", "Tue", "Wed", "Thu"],
    startTime: "5:00 PM",
    endTime: "8:00 PM",
    sessionDate: "01/06/2025",
    totalSlots: "20",
    institution: "Bangladesh Univ. of Eng. & Tech.",
    experience: "5 years",
    location: "Mirpur, Dhaka",
    hourlyFee: "500",
    teachingMode: "Online",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [photoValid] = useState(true);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleDay = (day) => {
    setForm((f) => ({
      ...f,
      selectedDays: f.selectedDays.includes(day)
        ? f.selectedDays.filter((d) => d !== day)
        : [...f.selectedDays, day],
    }));
  };

  const handleClear = () => {
    setForm({
      tutorName: "",
      subject: "Mathematics",
      photoUrl: "",
      selectedDays: [],
      startTime: "",
      endTime: "",
      sessionDate: "",
      totalSlots: "",
      institution: "",
      experience: "",
      location: "",
      hourlyFee: "",
      teachingMode: "Online",
    });

    setShowSuccess(false);
  };

  const handleSubmit = () => {
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 4000);
  };

  // Initials from name
  const initials = form.tutorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const selectedDaysLabel = form.selectedDays.length
    ? `Selected: ${form.selectedDays[0]} – ${
        form.selectedDays[form.selectedDays.length - 1]
      }`
    : "No days selected";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
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
          Add Tutor
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Add a new tutor
            </h1>

            <p className="text-sm text-zinc-500 mt-0.5">
              Fill in the details below to list a tutor on
              MediQueue
            </p>
          </div>

          <button className="shrink-0 flex items-center gap-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>

            Private route
          </button>
        </div>

        {/* Basic information */}
        <SectionCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          title="Basic information"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Tutor name">
              <input
                value={form.tutorName}
                onChange={set("tutorName")}
                placeholder="e.g. Rakib Sultani"
                className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </Field>

            <Field
              label="Subject / Category"
              hint="e.g. Mathematics, Physics, Chemistry..."
            >
              <Select
                value={form.subject}
                onChange={set("subject")}
              >
                {[
                  "Mathematics",
                  "Physics",
                  "Chemistry",
                  "Biology",
                  "English",
                  "ICT / CS",
                  "History",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Photo URL">
            <input
              value={form.photoUrl}
              onChange={set("photoUrl")}
              placeholder="https://i.ibb.co/xyz/tutor-photo.jpg"
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </Field>

          {/* Preview */}
          {form.tutorName && (
            <div className="mt-3 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-white">
                  {initials}
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-800">
                    {form.tutorName}
                  </p>

                  <p className="text-xs text-zinc-500">
                    Photo preview from URL
                  </p>
                </div>
              </div>

              {photoValid && form.photoUrl && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  Valid URL
                </span>
              )}
            </div>
          )}
        </SectionCard>

        {/* Schedule */}
        <SectionCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
          title="Schedule & availability"
        >
          <Field label="Available days">
            <div className="flex flex-wrap gap-2 mt-1">
              {DAYS.map((day) => {
                const active = form.selectedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                      active
                        ? "bg-emerald-500 text-white"
                        : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-zinc-400 mt-1">
              {selectedDaysLabel}
            </p>
          </Field>
        </SectionCard>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pb-2">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Clear form
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg"
          >
            Add tutor
          </button>
        </div>
      </div>

      {/* Success toast */}
      {showSuccess && (
        <SuccessToast name={form.tutorName || "Tutor"} />
      )}

      <Footer />
    </div>
  );
}