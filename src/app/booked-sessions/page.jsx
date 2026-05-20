import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Booked Sessions | MediQueue",
};

const bookings = [
  {
    id: 1,
    tutor: "Sarah Johnson",
    student: "Esha",
    email: "esha@gmail.com",
    status: "Booked",
  },
];

export default function BookedSessionsPage() {
  return (
    <div>

      <Navbar />

      <section className="px-6 py-20">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold text-center mb-12">
            My Booked Sessions
          </h1>

          <div className="overflow-x-auto bg-[#0f172a] rounded-3xl border border-gray-800">

            <table className="table w-full">

              <thead className="bg-[#081028] text-white">

                <tr>
                  <th>Tutor</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {bookings.map((booking) => (

                  <tr key={booking.id}>

                    <td>{booking.tutor}</td>

                    <td>{booking.student}</td>

                    <td>{booking.email}</td>

                    <td>{booking.status}</td>

                    <td>

                      <button className="bg-red-500 px-4 py-2 rounded-lg">
                        Cancel
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