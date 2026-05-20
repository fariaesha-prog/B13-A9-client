export default function WhyChooseUs() {
  return (
    <section className="px-6 py-20">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose MediQueue?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#0f172a] p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Expert Tutors
            </h3>

            <p className="text-gray-400">
              Learn from highly experienced teachers.
            </p>
          </div>

          <div className="bg-[#0f172a] p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Flexible Scheduling
            </h3>

            <p className="text-gray-400">
              Book sessions at your preferred time.
            </p>
          </div>

          <div className="bg-[#0f172a] p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Online Learning
            </h3>

            <p className="text-gray-400">
              Attend sessions from anywhere easily.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}