"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TutorCard from "@/components/TutorCard";
import api from "@/services/api";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get(`/tutors?search=${search}`)
      .then((res) => {
        setTutors(Array.isArray(res.data) ? res.data : res.data.tutors || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [search]);

  return (
    <div>
      <Navbar />
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-14">All Tutors</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search tutors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
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