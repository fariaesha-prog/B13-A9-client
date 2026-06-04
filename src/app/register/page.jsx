"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import api from "@/services/api"; // ✅ use api not fetch

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    minLength: password.length >= 6,
  };

  const allValid = checks.uppercase && checks.lowercase && checks.minLength;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) return setError("Full name is required");
    if (!formData.email.trim()) return setError("Email is required");
    if (!formData.email.includes("@")) return setError("Please enter a valid email");
    if (!formData.password) return setError("Password is required");
    if (!checks.uppercase) return setError("Password must contain an uppercase letter");
    if (!checks.lowercase) return setError("Password must contain a lowercase letter");
    if (!checks.minLength) return setError("Password must be at least 6 characters");

    try {
      setLoading(true);

      // ✅ api.post hits Render backend via NEXT_PUBLIC_API_URL
      const response = await api.post("/auth/register", formData);
      const { token, user } = response.data;

      if (!token) {
        setError("Registration failed — no token received");
        return;
      }

      // ✅ pass token so it saves to localStorage
      login(
        user || {
          email: formData.email,
          name: formData.name,
          photoURL: formData.photoURL || null,
        },
        token
      );

      setSuccess("Registration successful! Redirecting...");
      setFormData({ name: "", email: "", photoURL: "", password: "" });
      setPassword("");

      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l6.16-3.422A12.083 12.083 0 0112 21c-3.314 0-6.315-1.343-8.485-3.516" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center">Create account</h1>
          <p className="text-sm text-gray-400 text-center mt-1 mb-6">Join MediQueue and start booking sessions</p>

          <button type="button" className="w-full flex items-center justify-center gap-2.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 rounded-lg transition-colors">
            <FaGoogle className="text-[#4285F4]" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Arif Rahman"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="arif@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                placeholder="https://i.ibb.co/xyz/photo.jpg"
                value={formData.photoURL}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setFormData((prev) => ({ ...prev, password: val }));
                  setShowRequirements(true);
                  setError("");
                }}
                className={`w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 transition-all ${
                  password.length > 0 && !allValid
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50 bg-red-50"
                    : password.length > 0 && allValid
                    ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-50"
                    : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-50"
                }`}
              />

              {/* Invalid */}
              {showRequirements && password.length > 0 && !allValid && (
                <div className="mt-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3 space-y-1.5">
                  <p className="text-xs font-semibold text-red-600 mb-1">Password requirements</p>
                  {!checks.uppercase && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Must contain an uppercase letter
                    </div>
                  )}
                  {!checks.lowercase && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Must contain a lowercase letter
                    </div>
                  )}
                  {!checks.minLength && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Minimum 6 characters
                    </div>
                  )}
                </div>
              )}

              {/* Valid */}
              {showRequirements && password.length > 0 && allValid && (
                <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-3 space-y-1.5">
                  {["Uppercase letter", "Lowercase letter", "At least 6 characters"].map((label) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-emerald-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2.5 text-sm text-emerald-600">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mt-1"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-medium hover:text-emerald-700">
              Log in
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}