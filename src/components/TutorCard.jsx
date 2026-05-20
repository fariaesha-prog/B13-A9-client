import Link from "next/link";

export default function TutorCard({ tutor }) {
  return (
    <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800 hover:scale-105 transition duration-300">

      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {tutor.name}
        </h2>

        <p className="text-cyan-400 mt-2">
          {tutor.subject}
        </p>

        <p className="text-gray-400 mt-2">
          ${tutor.fee}/hour
        </p>

        <Link href={`/tutors/${tutor.id}`}>
          <button className="mt-5 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
            Book Session
          </button>
        </Link>

      </div>
    </div>
  );
}