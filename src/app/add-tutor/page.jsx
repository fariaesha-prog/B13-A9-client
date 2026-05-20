import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Add Tutor | MediQueue",
};

export default function AddTutorPage() {
  return (
    <div>

      <Navbar />

      <section className="px-6 py-20">

        <div className="max-w-4xl mx-auto bg-[#0f172a] p-10 rounded-3xl border border-gray-800">

          <h1 className="text-5xl font-bold text-center mb-12">
            Add Tutor
          </h1>

          <form className="grid md:grid-cols-2 gap-6">

            {/* Tutor Name */}

            <div>
              <label className="block mb-2">
                Tutor Name
              </label>

              <input
                type="text"
                placeholder="Tutor name"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Photo URL */}

            <div>
              <label className="block mb-2">
                Photo URL
              </label>

              <input
                type="text"
                placeholder="Image link"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Subject */}

            <div>
              <label className="block mb-2">
                Subject
              </label>

              <select className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none">

                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>Programming</option>

              </select>
            </div>

            {/* Available Days */}

            <div>
              <label className="block mb-2">
                Available Days
              </label>

              <input
                type="text"
                placeholder="Sun - Thu"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Available Time */}

            <div>
              <label className="block mb-2">
                Available Time
              </label>

              <input
                type="text"
                placeholder="5PM - 8PM"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Hourly Fee */}

            <div>
              <label className="block mb-2">
                Hourly Fee
              </label>

              <input
                type="number"
                placeholder="$25"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Total Slot */}

            <div>
              <label className="block mb-2">
                Total Slot
              </label>

              <input
                type="number"
                placeholder="20"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Session Date */}

            <div>
              <label className="block mb-2">
                Session Start Date
              </label>

              <input
                type="date"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Institution */}

            <div>
              <label className="block mb-2">
                Institution
              </label>

              <input
                type="text"
                placeholder="University name"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Experience */}

            <div>
              <label className="block mb-2">
                Experience
              </label>

              <input
                type="text"
                placeholder="3 years"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Location */}

            <div>
              <label className="block mb-2">
                Location
              </label>

              <input
                type="text"
                placeholder="Dhaka"
                className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Teaching Mode */}

            <div>
              <label className="block mb-2">
                Teaching Mode
              </label>

              <select className="w-full bg-[#081028] border border-gray-700 rounded-xl px-4 py-3 outline-none">

                <option>Online</option>
                <option>Offline</option>
                <option>Both</option>

              </select>
            </div>

            {/* Button */}

            <div className="md:col-span-2">

              <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-lg font-semibold transition">

                Submit Tutor

              </button>

            </div>

          </form>

        </div>

      </section>

      <Footer />

    </div>
  );
}