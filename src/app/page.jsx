import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBanner from "@/components/HeroBanner";
import tutors from "@/data/tutors";
import TutorCard from "@/components/TutorCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div>

      <Navbar />

      <HeroBanner />

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