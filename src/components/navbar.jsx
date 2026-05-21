"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import { AuthContext } from "../context/AuthContext"; // wire up later

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // const { user, logout } = useContext(AuthContext); // wire up later
  const user = null; // placeholder until auth is ready

  const activeLinkClass = "text-[#1D9E75] font-medium text-sm";
  const inactiveLinkClass = "text-gray-500 hover:text-[#1D9E75] text-sm transition-colors";

  const getLinkClass = (href) => {
    if (href === "/tutors") {
      return pathname === "/tutors" || pathname?.startsWith("/tutors/")
        ? activeLinkClass
        : inactiveLinkClass;
    }

    return pathname === href ? activeLinkClass : inactiveLinkClass;
  };

  const links = (
    <>
      <Link href="/" className={getLinkClass("/")}>
        Home
      </Link>
      <Link href="/tutors" className={getLinkClass("/tutors")}>
        Tutors
      </Link>
      {user && (
        <>
          <Link href="/add-tutor" className={getLinkClass("/add-tutor")}>
            Add Tutor
          </Link>
          <Link href="/my-tutors" className={getLinkClass("/my-tutors")}>
            My Tutors
          </Link>
          <Link href="/my-sessions" className={getLinkClass("/my-sessions")}>
            My Sessions
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1D9E75] flex items-center justify-center">
            <span className="text-white text-xs font-bold">MQ</span>
          </div>
          <span className="text-base font-medium text-gray-800">MediQueue</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Dark mode toggle — wire up later */}
          <button className="w-8 h-4 rounded-full bg-[#1D9E75] relative focus:outline-none hidden sm:block">
            <span className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
          </button>

          {user ? (
            /* Logged in: avatar + dropdown */
            <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full cursor-pointer object-cover border border-gray-200"
              />
              {/* Dropdown */}
              <div className="absolute right-0 top-10 w-44 bg-white border border-gray-100 rounded-xl shadow-sm py-1 hidden group-hover:block z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <button
                  // onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            /* Not logged in */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-[#1D9E75] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm bg-[#1D9E75] text-white px-4 py-1.5 rounded-lg hover:bg-[#0F6E56] transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 bg-white">
          {links}
        </div>
      )}
    </nav>
  );
}