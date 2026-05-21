import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#04342C] text-[#9FE1CB] pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#1D9E75] flex items-center justify-center">
                <span className="text-white text-xs font-bold">MQ</span>
              </div>
              <span className="text-white font-medium text-sm">MediQueue</span>
            </div>
            <p className="text-xs text-[#5DCAA5] leading-relaxed">
              Connecting students with expert tutors for online and offline
              learning sessions across Bangladesh.
            </p>
          </div>

          {/* Learning services */}
          <div>
            <p className="text-white text-xs font-medium mb-3">Learning services</p>
            <ul className="flex flex-col gap-2">
              {["Browse tutors", "Become a tutor", "Session management", "Pricing guide"].map((item) => (
                <li key={item}>
                  <Link
                    href="/tutors"
                    className="text-[#5DCAA5] text-xs hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <p className="text-white text-xs font-medium mb-3">Contact</p>
            <ul className="flex flex-col gap-2 mb-4">
              <li className="text-[#5DCAA5] text-xs">hello@mediqueue.com</li>
              <li className="text-[#5DCAA5] text-xs">Dhaka, Bangladesh</li>
            </ul>
            {/* Social icons */}
            <div className="flex gap-2">
              <a
                href="#"
                className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-[#9FE1CB]" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-[#9FE1CB]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-[#9FE1CB]" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-[#5DCAA5] text-xs">
            © {new Date().getFullYear()} MediQueue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}