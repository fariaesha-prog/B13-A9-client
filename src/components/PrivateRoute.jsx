"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "./navbar";
import Footer from "./footer";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { user, loading, isInitialized } = useAuth();

  // Only redirect after auth is fully initialized
  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login");
    }
  }, [isInitialized, user, router]);

  // Loading state: show spinner
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <section className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D9E75]"></div>
        </section>
        <Footer />
      </div>
    );
  }

  // Redirect is handled in useEffect, don't render null to avoid flash
  if (!user) {
    return null;
  }

  // User is authenticated, render children
  return children;
}
