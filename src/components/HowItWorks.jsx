const steps = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-[#1D9E75]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
    iconBg: "bg-[#E1F5EE]",
    step: "01",
    title: "Find a tutor",
    desc: "Search by subject, filter by availability and teaching mode, and pick the best match for your learning goals.",
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-[#534AB7]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    iconBg: "bg-[#EEEDFE]",
    step: "02",
    title: "Book a slot",
    desc: "Pick an available time slot. The system instantly auto-generates your unique session token and locks your seat.",
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-[#854F0B]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 3 7.5v9A2.25 2.25 0 0 0 4.5 18.75z" />
      </svg>
    ),
    iconBg: "bg-[#FAEEDA]",
    step: "03",
    title: "Start learning",
    desc: "Join your session online or offline, track your progress across subjects, and rebook anytime with one click.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            How it works
          </h2>
          <p className="text-sm text-gray-400">
            Three simple steps to your first session
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">

          {/* Connector line — desktop only */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gray-200 z-0" />

          {steps.map((s) => (
            <div
              key={s.id}
              className="relative z-10 bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-medium text-gray-300">
                {s.step}
              </span>

              {/* Icon circle */}
              <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                {s.icon}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-1.5">
                  {s.title}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}