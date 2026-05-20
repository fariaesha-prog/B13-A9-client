import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import tutors from "@/data/tutors";
import TutorCard from "@/components/TutorCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div>

      <Navbar />

      {/* HERO SECTION */}

      <section className="min-h-screen flex items-center justify-center text-center px-6">

        <div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find Your Perfect Tutor
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Book online sessions with experienced tutors and
            improve your learning journey easily.
          </p>

          <button className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold transition">
            Explore Tutors
          </button>

        </div>

      </section>

      {/* AVAILABLE TUTORS */}

      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-14">
            Available Tutors
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
              />
            ))}

          </div>

        </div>

      </section>

        <WhyChooseUs />
        <StatsSection />

      <Footer />

    </div>
  );
}