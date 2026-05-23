"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import api from "@/services/api";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email.trim()) {
      return setError("Email is required");
    }

    if (!formData.email.includes("@")) {
      return setError("Please enter a valid email");
    }

    if (!formData.password) {
      return setError("Password is required");
    }

    try {
      setLoading(true);

  const response = await api.post("/auth/login", formData);

console.log("LOGIN RESPONSE:", response.data); // DEBUG

const token = response.data?.token;

if (!token) {
  throw new Error("Token missing from backend response");
}

// ✅ SAVE TOKEN
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(response.data.user));

login(response.data.user);

      const data = response.data;

    if (!data.token) {
  throw new Error("No token from backend");
}

localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      login(data.user);

      setSuccess(
        "Login successful! Redirecting..."
      );

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed"
      );

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l6.16-3.422A12.083 12.083 0 0112 21c-3.314 0-6.315-1.343-8.485-3.516"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Welcome back
          </h1>

          <p className="text-sm text-gray-400 text-center mt-1 mb-6">
            Log in to your MediQueue account
          </p>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 rounded-lg transition-colors"
          >
            <FaGoogle className="text-[#4285F4]" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Email address
              </label>

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
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm text-emerald-600">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
            >
              {loading
                ? "Logging in..."
                : "Log in"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-medium hover:text-emerald-700"
            >
              Register
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}