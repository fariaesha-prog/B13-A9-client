import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>

      <Navbar />

      <section className="min-h-screen flex items-center justify-center text-center px-6">

        <div>
          <h1 className="text-5xl md:text-7xl font-bold">
            Find The Perfect Tutor
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Book sessions with expert tutors online.
          </p>

          <button className="mt-8 bg-cyan-500 px-6 py-3 rounded-xl text-lg">
            Explore Tutors
          </button>
        </div>

      </section>

      <Footer />

    </div>
  );
}