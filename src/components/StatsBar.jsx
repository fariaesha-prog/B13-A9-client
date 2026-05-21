const stats = [
  { value: "340+", label: "Expert tutors" },
  { value: "18",   label: "Subjects covered" },
  { value: "12k+", label: "Sessions booked" },
  { value: "4.9 ★", label: "Avg. rating" },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100 bg-gray-50">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`text-center py-4 ${
            i < stats.length - 1 ? "border-r border-gray-100" : ""
          }`}
        >
          <p className="text-lg font-medium text-[#1D9E75]">{s.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}