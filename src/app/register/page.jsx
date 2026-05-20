"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";


export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    if (!/[A-Z]/.test(password)) {
      return setError(
        "Password must contain an uppercase letter"
      );
    }

    if (!/[a-z]/.test(password)) {
      return setError(
        "Password must contain a lowercase letter"
      );
    }

    if (password.length < 6) {
      return setError(
        "Password must be at least 6 characters"
      );
    }

    setError("");
  };

  return (
    <div>

      <Navbar />

      <section className="min-h-screen flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-3xl border border-gray-800">

          <h1 className="text-4xl font-bold text-center mb-8">
            Register
          </h1>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">
                Photo URL
              </label>

              <input
                type="text"
                placeholder="Photo URL"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
              Register
            </button>

          </form>

          <button className="w-full mt-5 border border-gray-700 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-[#081028] transition">
            <FaGoogle />
            Continue with Google
          </button>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-cyan-400"
            >
              Login
            </Link>
          </p>

        </div>

      </section>

      <Footer />

    </div>
  );
}