import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBanner from "@/components/HeroBanner";
import tutors from "@/data/tutors";
import TutorCard from "@/components/TutorCard";
import AvailableTutors from "@/components/AvailableTutors";

import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <div>

      <Navbar />

      <HeroBanner />
 <StatsBar />

<AvailableTutors />
      
       

      <Footer />

    </div>
  );
}