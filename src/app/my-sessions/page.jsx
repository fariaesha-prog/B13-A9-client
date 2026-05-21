"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MySessionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="flex-1 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Sessions</h1>
          {/* Add sessions content here */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-gray-600">Sessions page content goes here</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
