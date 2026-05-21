import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBanner from "@/components/HeroBanner";
import tutors from "@/data/tutors";
import TutorCard from "@/components/TutorCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <div>

      <Navbar />

      <HeroBanner />
 <StatsBar />


        <WhyChooseUs />
       

      <Footer />

    </div>
  );
}