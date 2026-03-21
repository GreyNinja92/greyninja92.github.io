export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left */}
        <p className="text-sm text-white/25">
          &copy; {new Date().getFullYear()} Saksham Khatod
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/GreyNinja92"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/sakshamkhatod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
