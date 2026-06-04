"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";
import api from "@/services/api";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "ICT / CS", "Accounting", "History"];
const MODES = ["Online", "Offline", "Both"];

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-600">{label}</label>}
      {children}
      {hint && <p className="text-[11px] text-zinc-400">{hint}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-800 mb-5">{title}</h2>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors";

export default function AddTutor() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    tutorName: "",
    subject: "Mathematics",
    tutorPhoto: "",
    selectedDays: [],
    startTime: "",
    endTime: "",
    sessionStartDate: new Date().toISOString().split("T")[0],
    totalSlot: "",
    institution: "",
    experience: "",
    location: "",
    hourlyFee: "",
    teachingMode: "Online",
  });

  const [loading, setLoading] = useState(false);

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
      tutorPhoto: "",
      selectedDays: [],
      startTime: "",
      endTime: "",
      sessionStartDate: new Date().toISOString().split("T")[0],
      totalSlot: "",
      institution: "",
      experience: "",
      location: "",
      hourlyFee: "",
      teachingMode: "Online",
    });
  };

  // ✅ actually sends data to backend
  const handleSubmit = async () => {
    if (!form.tutorName.trim()) return toast.error("Tutor name is required");
    if (!form.hourlyFee) return toast.error("Hourly fee is required");
    if (!form.totalSlot) return toast.error("Total slots is required");
    if (form.selectedDays.length === 0) return toast.error("Select at least one available day");

    const payload = {
      tutorName:        form.tutorName,
      tutorPhoto:       form.tutorPhoto,
      subject:          form.subject,
      availableDays:    form.selectedDays,
      startTime:        form.startTime,
      endTime:          form.endTime,
      sessionStartDate: form.sessionStartDate,
      totalSlot:        Number(form.totalSlot),
      originalSlot:     Number(form.totalSlot),
      institution:      form.institution,
      experience:       form.experience,
      location:         form.location,
      hourlyFee:        Number(form.hourlyFee),
      teachingMode:     form.teachingMode,
      // tutorEmail is set from req.user.email in backend
    };

    setLoading(true);
    try {
      await api.post("/tutors", payload);
      toast.success(`${form.tutorName} added successfully!`);
      handleClear();
      setTimeout(() => router.push("/tutors"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add tutor");
    } finally {
      setLoading(false);
    }
  };

  const initials = form.tutorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
        <Navbar />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 px-5 py-2.5 bg-white border-b border-zinc-200 text-xs text-zinc-500">
          <span className="hover:text-zinc-700 cursor-pointer" onClick={() => router.push("/")}>Home</span>
          <span>›</span>
          <span className="text-zinc-700 font-medium">Add Tutor</span>
        </nav>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Add a new tutor</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Fill in the details below to list a tutor on MediQueue</p>
          </div>

          {/* Basic info */}
          <SectionCard title="Basic information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field label="Tutor name">
                <input value={form.tutorName} onChange={set("tutorName")} placeholder="e.g. Rakib Sultani" className={inputClass} />
              </Field>
              <Field label="Subject / Category">
                <select value={form.subject} onChange={set("subject")} className={inputClass}>
                  {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Photo URL">
              <input value={form.tutorPhoto} onChange={set("tutorPhoto")} placeholder="https://i.ibb.co/xyz/photo.jpg" className={inputClass} />
            </Field>
            {form.tutorName && (
              <div className="mt-3 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-white">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-800">{form.tutorName}</p>
                  <p className="text-xs text-zinc-500">Photo preview</p>
                </div>
              </div>
            )}
          </SectionCard>

          {/* Schedule */}
          <SectionCard title="Schedule & availability">
            <div className="flex flex-col gap-4">
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
                          active ? "bg-emerald-500 text-white" : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Start time">
                  <input value={form.startTime} onChange={set("startTime")} placeholder="5:00 PM" className={inputClass} />
                </Field>
                <Field label="End time">
                  <input value={form.endTime} onChange={set("endTime")} placeholder="8:00 PM" className={inputClass} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Session start date" hint="Booking blocked before this date">
                  <input type="date" value={form.sessionStartDate} onChange={set("sessionStartDate")} className={inputClass} />
                </Field>
                <Field label="Total slots" hint="Max students that can book">
                  <input type="number" value={form.totalSlot} onChange={set("totalSlot")} placeholder="20" className={inputClass} />
                </Field>
              </div>
            </div>
          </SectionCard>

          {/* Tutor details */}
          <SectionCard title="Tutor details">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Institution">
                  <input value={form.institution} onChange={set("institution")} placeholder="BUET" className={inputClass} />
                </Field>
                <Field label="Experience">
                  <input value={form.experience} onChange={set("experience")} placeholder="5 years" className={inputClass} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Location">
                  <input value={form.location} onChange={set("location")} placeholder="Mirpur, Dhaka" className={inputClass} />
                </Field>
                <Field label="Hourly fee (৳)">
                  <input type="number" value={form.hourlyFee} onChange={set("hourlyFee")} placeholder="500" className={inputClass} />
                </Field>
              </div>

              <Field label="Teaching mode">
                <select value={form.teachingMode} onChange={set("teachingMode")} className={inputClass}>
                  {MODES.map((m) => <option key={m}>{m}</option>)}
                </select>
              </Field>
            </div>
          </SectionCard>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pb-2">
            <button
              type="button"
              onClick={handleClear}
              className="bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              Clear form
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg"
            >
              {loading ? "Adding..." : "Add tutor"}
            </button>
          </div>

        </div>
        <Footer />
      </div>
    </PrivateRoute>
  );
}