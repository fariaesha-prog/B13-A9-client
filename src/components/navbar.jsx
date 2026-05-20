"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <Link href="/">Home</Link>
      <Link href="/tutors">Tutors</Link>
      <Link href="/add-tutor">Add Tutor</Link>
      <Link href="/my-tutors">My Tutors</Link>
      <Link href="/booked-sessions">Booked Sessions</Link>
    </>
  );

  return (
    <nav className="bg-[#07122b] px-6 py-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-3xl font-bold text-cyan-400">
          MediQueue
        </h1>

        <div className="hidden md:flex gap-6 items-center">
          {links}

          <button className="bg-cyan-500 px-4 py-2 rounded-lg">
            Login
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          {links}

          <button className="bg-cyan-500 px-4 py-2 rounded-lg">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}