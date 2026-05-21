"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    badge: "✦ Trusted by 2,400+ students",
    heading: "Find the right tutor,\nbook your session instantly",
    sub: "Browse expert tutors by subject, check real-time availability, and lock in your slot — no back-and-forth needed.",
    btnLabel: "Browse Tutors",
    btnTo: "/tutors",
    bg: "from-[#04342C] via-[#0F6E56] to-[#1D9E75]",
    badgeColor: "text-[#9FE1CB]",
    subColor: "text-[#9FE1CB]",
    btnColor: "text-[#0F6E56]",
  },
  {
    id: 2,
    badge: "✦ 18 subjects available",
    heading: "Expert tutors across\nevery subject you need",
    sub: "From Mathematics and Physics to ICT and English — find a specialist tutor who matches your learning goals.",
    btnLabel: "Explore Subjects",
    btnTo: "/tutors",
    bg: "from-[#26215C] via-[#534AB7] to-[#7F77DD]",
    badgeColor: "text-[#CECBF6]",
    subColor: "text-[#CECBF6]",
    btnColor: "text-[#3C3489]",
  },
  {
    id: 3,
    badge: "✦ Online & offline sessions",
    heading: "Learn your way —\nonline or face to face",
    sub: "Choose tutors who teach online, offline, or both. Flexible scheduling designed around your timetable.",
    btnLabel: "Book a Session",
    btnTo: "/tutors",
    bg: "from-[#412402] via-[#854F0B] to-[#EF9F27]",
    badgeColor: "text-[#FAC775]",
    subColor: "text-[#FAC775]",
    btnColor: "text-[#633806]",
  },
];

export default function HeroBanner() {
  const router = useRouter();

  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`bg-linear-to-br ${slide.bg} relative overflow-hidden px-6 sm:px-14 py-14 sm:py-20 flex flex-col justify-center min-h-80 sm:min-h-100`}
            >
              {/* Decorative circles */}
              <div className="absolute -right-7.5 -top-7.5 w-56 h-56 rounded-full bg-white/4 pointer-events-none" />
              <div className="absolute right-16 -bottom-12.5 w-40 h-40 rounded-full bg-white/3 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 max-w-xl">
                <span
                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/15 ${slide.badgeColor} mb-4`}
                >
                  {slide.badge}
                </span>

                <h1 className="text-2xl sm:text-3xl font-medium text-white leading-snug mb-3 whitespace-pre-line">
                  {slide.heading}
                </h1>

                <p className={`text-sm leading-relaxed mb-6 ${slide.subColor}`}>
                  {slide.sub}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(slide.btnTo)}
                    className={`bg-white ${slide.btnColor} font-medium text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {slide.btnLabel} →
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper styles */}
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 20px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.4);
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 28px;
          background: #ffffff;
        }
        .hero-swiper .swiper-button-prev,
        .hero-swiper .swiper-button-next {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          color: white;
        }
        .hero-swiper .swiper-button-prev::after,
        .hero-swiper .swiper-button-next::after {
          font-size: 14px;
          font-weight: 700;
        }
        .hero-swiper .swiper-button-prev:hover,
        .hero-swiper .swiper-button-next:hover {
          background: rgba(255,255,255,0.25);
        }
      `}</style>
    </section>
  );
}