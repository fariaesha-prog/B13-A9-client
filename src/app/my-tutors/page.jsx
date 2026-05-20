import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "My Tutors | MediQueue",
};

const tutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    subject: "Mathematics",
    fee: 25,
  },

  {
    id: 2,
    name: "David Lee",
    subject: "Physics",
    fee: 30,
  },
];

export default function MyTutorsPage() {
  return (
    <div>

      <Navbar />

      <section className="px-6 py-20">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold text-center mb-12">
            My Tutors
          </h1>

          <div className="overflow-x-auto bg-[#0f172a] rounded-3xl border border-gray-800">

            <table className="table w-full">

              <thead className="bg-[#081028] text-white">

                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Fee</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {tutors.map((tutor) => (

                  <tr key={tutor.id}>

                    <td>{tutor.name}</td>

                    <td>{tutor.subject}</td>

                    <td>${tutor.fee}</td>

                    <td className="space-x-3">

                      <button className="bg-cyan-500 px-4 py-2 rounded-lg">
                        Update
                      </button>

                      <button className="bg-red-500 px-4 py-2 rounded-lg">
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}