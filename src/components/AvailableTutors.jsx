"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TutorCard from "./TutorCard";
import TutorCardSkeleton from "./TutorCardSkeleton";
<<<<<<< HEAD
import api from "@/services/api";
=======

>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6
export default function AvailableTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

<<<<<<< HEAD
useEffect(() => {
  api.get("/tutors?limit=6")
    .then((res) => {
      setTutors(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError("Failed to fetch tutors");
      setLoading(false);
    });
}, []);
=======
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors?limit=6`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tutors");
        return res.json();
      })
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
>>>>>>> 6930dac4c9707fc40fa0bcac21a086629bb745b6

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      {/* Section header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-1">
            Available tutors
          </h2>
          <p className="text-sm text-gray-400">
            Showing 6 of our top-rated tutors
          </p>
        </div>
        <button
          onClick={() => router.push("/tutors")}
          className="text-sm text-[#1D9E75] hover:underline"
        >
          View all →
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="text-center py-16">
          <p className="text-sm text-red-500">
            Something went wrong: {error}
          </p>
        </div>
      )}

      {/* Grid */}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <TutorCardSkeleton key={i} />
            ))}

          {/* Tutor cards */}
          {!loading &&
            tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && tutors.length === 0 && (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl">
          <p className="text-sm font-medium text-gray-700 mb-1">
            No tutors listed yet
          </p>
          <p className="text-xs text-gray-400">
            Be the first to add a tutor to MediQueue.
          </p>
        </div>
      )}
    </section>
  );
}