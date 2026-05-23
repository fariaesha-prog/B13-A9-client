"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TutorCard from "@/components/TutorCard";
import api from "@/services/api";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await api.get("/tutors");
        setTutors(res.data);
      } catch (err) {
        console.log("Failed to fetch tutors", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div>
      <Navbar />

      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-14">
            All Tutors
          </h1>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}