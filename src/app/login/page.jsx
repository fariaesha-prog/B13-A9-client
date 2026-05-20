import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export const metadata = {
  title: "Login | MediQueue",
};

export default function LoginPage() {
  return (
    <div>

      <Navbar />

      <section className="min-h-screen flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-3xl border border-gray-800">

          <h1 className="text-4xl font-bold text-center mb-8">
            Login
          </h1>

          <form className="space-y-5">

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
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-cyan-400 text-sm"
              >
                Forget Password?
              </button>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
              Login
            </button>

          </form>

          <button className="w-full mt-5 border border-gray-700 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-[#081028] transition">
            <FaGoogle />
            Continue with Google
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don&apos;t have an account?{" "}

            <Link
              href="/register"
              className="text-cyan-400"
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