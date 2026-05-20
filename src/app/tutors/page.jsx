import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import tutors from "@/data/tutors";
import TutorCard from "@/components/TutorCard";

export const metadata = {
  title: "Tutors | MediQueue",
};

export default function TutorsPage() {
  return (
    <div>

      <Navbar />

      <section className="px-6 py-20">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold text-center mb-14">
            All Tutors
          </h1>

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

      <Footer />

    </div>
  );
}