import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#07122b] mt-20 px-6 py-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-cyan-400">
            MediQueue
          </h2>

          <p className="mt-4 text-gray-400">
            Book tutors and manage learning sessions easily.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Services
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Private Tutors</li>
            <li>Online Classes</li>
            <li>Session Booking</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            mediqueue@gmail.com
          </p>

          <div className="flex gap-4 mt-4 text-2xl">
            <FaFacebook />
            <FaGithub />
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-10">
        © 2026 MediQueue
      </p>
    </footer>
  );
}