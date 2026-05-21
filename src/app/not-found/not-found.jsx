import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-6xl font-bold text-cyan-400">
        404
      </h1>

      <p className="text-xl mt-4 text-gray-400">
        Page not found
      </p>

      <Link
        href="/"
        className="mt-6 bg-cyan-500 px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>

    </div>
  );
}