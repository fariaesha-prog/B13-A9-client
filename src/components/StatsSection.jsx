export default function StatsSection() {
  return (
    <section className="px-6 pb-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">

        <div className="bg-[#0f172a] p-8 rounded-2xl">
          <h2 className="text-5xl font-bold text-cyan-400">
            500+
          </h2>

          <p className="mt-3 text-gray-400">
            Students
          </p>
        </div>

        <div className="bg-[#0f172a] p-8 rounded-2xl">
          <h2 className="text-5xl font-bold text-cyan-400">
            120+
          </h2>

          <p className="mt-3 text-gray-400">
            Tutors
          </p>
        </div>

        <div className="bg-[#0f172a] p-8 rounded-2xl">
          <h2 className="text-5xl font-bold text-cyan-400">
            98%
          </h2>

          <p className="mt-3 text-gray-400">
            Satisfaction
          </p>
        </div>

        <div className="bg-[#0f172a] p-8 rounded-2xl">
          <h2 className="text-5xl font-bold text-cyan-400">
            24/7
          </h2>

          <p className="mt-3 text-gray-400">
            Support
          </p>
        </div>

      </div>

    </section>
  );
}