import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
      style={{ background: "#08080f" }}
    >
      <p className="text-6xl sm:text-8xl font-bold text-white/10">404</p>
      <h1 className="text-2xl font-semibold text-slate-300">Page not found</h1>
      <Link
        href="/"
        className="px-6 py-3 rounded-full text-sm font-medium text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
      >
        Go home
      </Link>
    </div>
  );
}
