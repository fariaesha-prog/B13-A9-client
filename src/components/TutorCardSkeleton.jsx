export default function TutorCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3 bg-gray-100 rounded w-3/4" />
          <div className="h-2.5 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      {/* Badges */}
      <div className="flex gap-2">
        <div className="h-5 w-20 bg-gray-100 rounded-full" />
        <div className="h-5 w-14 bg-gray-100 rounded-full" />
      </div>
      {/* Schedule */}
      <div className="h-3 bg-gray-100 rounded w-full" />
      {/* Slot bar */}
      <div className="h-1.5 bg-gray-100 rounded-full w-full" />
      {/* Button */}
      <div className="h-9 bg-gray-100 rounded-lg w-full mt-auto" />
    </div>
  );
}