var currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      {/* 🌈 Top Colors */}
      <div className="w-full h-1 flex">
        <div className="flex-1" style={{ backgroundColor: "#FFFB84" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#84FF96" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#84F3FF" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#84B9FF" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#9084FF" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#DC84FF" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#FF84F7" }}></div>
        <div className="flex-1" style={{ backgroundColor: "#FF787A" }}></div>
      </div>

      {/* 💬 Top Section */}
      <div className="w-full max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 border-b border-gray-100">
        {/* Help Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
          <h2 className="font-semibold text-[22px] text-gray-800">Need help?</h2>
          <p className="text-gray-500 text-sm max-w-[260px] sm:max-w-full">
            Our support team is happy to assist you with anything related to Unwrapza.
          </p>
          <button className="border-2 border-[#44A77D] px-10 h-[48px] rounded-md font-semibold text-gray-800 hover:bg-[#44A77D] hover:text-white transition-all duration-300">
            Contact us
          </button>
        </div>

        {/* Pages Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
          <h2 className="font-semibold text-[22px] text-gray-800">Pages</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="/account" className="hover:text-[#44A77D] transition-colors">
                Account
              </a>
            </li>
            <li>
              <a href="/account/calendar" className="hover:text-[#44A77D] transition-colors">
                Calendar
              </a>
            </li>
            <li>
              <a href="/account/wishlist" className="hover:text-[#44A77D] transition-colors">
                Wishlist
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
          <h2 className="font-semibold text-[22px] text-gray-800">Sign up for emails</h2>
          <p className="text-gray-500 text-sm max-w-[300px]">
            Get updates on new features, AI deals, and personalized gift ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              className="flex-1 py-2 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#44A77D] transition-all"
            />
            <button className="bg-[#44A77D] text-white font-semibold px-5 py-3 rounded-md hover:bg-[#004a31] transition-all">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* 🌿 Middle Footer */}
      <div className="bg-[#44A77D] text-white">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
          {/* Company */}
          <div>
            <h3 className="uppercase text-xs tracking-widest text-white/80 font-semibold mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:opacity-80 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="/newsletter" className="hover:opacity-80 transition-opacity">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="uppercase text-xs tracking-widest text-white/80 font-semibold mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="hover:opacity-80 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:opacity-80 transition-opacity">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:opacity-80 transition-opacity">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="uppercase text-xs tracking-widest text-white/80 font-semibold mb-3">
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://instagram.com/unwrapza"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@unwrapza"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  Tiktok
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/unwrapza"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@unwrapza.com"
                  className="hover:opacity-80 transition-opacity"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ⚖️ Bottom */}
      <div className="bg-[#44A77D] border-t border-white/20">
        <div className="max-w-[1200px] mx-auto text-center py-5 px-4">
          <p className="text-white font-semibold text-sm">
            © {currentYear} Unwrapza
          </p>
          <p className="text-white/90 text-xs mt-2 leading-relaxed max-w-[700px] mx-auto">
            Unwrapza participates in affiliate programs and may earn commissions
            from qualifying purchases made through links on this website.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
