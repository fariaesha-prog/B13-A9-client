import tutors from "@/data/tutors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TutorDetails({ params }) {
  const tutor = tutors.find(
    (t) => t.id == params.id
  );

  return (
    <div>

      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="bg-[#0f172a] rounded-3xl overflow-hidden">

          <img
            src={tutor.image}
            alt={tutor.name}
            className="w-full h-[500px] object-cover"
          />

          <div className="p-10">

            <h1 className="text-5xl font-bold">
              {tutor.name}
            </h1>

            <p className="text-cyan-400 text-2xl mt-4">
              {tutor.subject}
            </p>

            <p className="text-gray-400 mt-6">
              Hourly Fee: ${tutor.fee}
            </p>

            <button className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold">
              Book Session
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}