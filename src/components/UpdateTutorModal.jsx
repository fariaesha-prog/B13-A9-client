import { useState } from "react";
import axios from "axios";

const subjectOptions = [
  "Mathematics", "Physics", "Chemistry",
  "Biology", "English", "ICT / CS", "Accounting",
];
const modeOptions = ["Online", "Offline", "Both"];

export default function UpdateTutorModal({ tutor, onClose, onSuccess }) {
  const [form, setForm] = useState({
    tutorName:        tutor.tutorName,
    photo:            tutor.photo || "",
    subject:          tutor.subject,
    availableDays:    tutor.availableDays,
    startTime:        tutor.startTime,
    endTime:          tutor.endTime,
    hourlyFee:        tutor.hourlyFee,
    totalSlot:        tutor.totalSlot,
    sessionStartDate: tutor.sessionStartDate?.slice(0, 10),
    institution:      tutor.institution,
    experience:       tutor.experience,
    location:         tutor.location,
    teachingMode:     tutor.teachingMode,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/tutors/${tutor._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onSuccess(res.data);
    } catch {
      // error handled by parent toast
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/10 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#04342C]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EEEDFE] flex items-center justify-center text-xs font-medium text-[#3C3489]">
              {tutor.tutorName?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Update tutor</p>
              <p className="text-xs text-gray-400">{tutor.tutorName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Tutor name
              </label>
              <input
                name="tutorName"
                value={form.tutorName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              >
                {subjectOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Photo URL
            </label>
            <input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://i.ibb.co/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Hourly fee (৳)
              </label>
              <input
                name="hourlyFee"
                type="number"
                value={form.hourlyFee}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Total slots
              </label>
              <input
                name="totalSlot"
                type="number"
                value={form.totalSlot}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Start time
              </label>
              <input
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className={inputClass}
                placeholder="5:00 PM"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                End time
              </label>
              <input
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className={inputClass}
                placeholder="8:00 PM"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Available days
              </label>
              <input
                name="availableDays"
                value={form.availableDays}
                onChange={handleChange}
                className={inputClass}
                placeholder="Sun – Thu"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Session start date
              </label>
              <input
                name="sessionStartDate"
                type="date"
                value={form.sessionStartDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Institution
              </label>
              <input
                name="institution"
                value={form.institution}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Experience
              </label>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className={inputClass}
                placeholder="5 years"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className={inputClass}
                placeholder="Mirpur, Dhaka"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Teaching mode
              </label>
              <select
                name="teachingMode"
                value={form.teachingMode}
                onChange={handleChange}
                className={inputClass}
              >
                {modeOptions.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1D9E75] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0F6E56] transition-colors disabled:opacity-60"
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}