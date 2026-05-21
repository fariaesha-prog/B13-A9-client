"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/PrivateRoute";

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <section className="flex-1 px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
            {/* Add profile content here */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <p className="text-gray-600">Profile page content goes here</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PrivateRoute>
  );
}
