const PrivacyPolicy = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-20 text-gray-700 leading-relaxed">
      {/* Header: Zelfde stijl als de rest van de site */}
      <div className="flex flex-col mb-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
          Privacy <span className="text-[#44A77D]">Policy</span>
        </h1>
        <div className="h-1.5 w-16 bg-[#44A77D] rounded-full"></div>
        <p className="mt-6 text-sm font-medium text-gray-400">Last updated: 3-12-2025</p>
      </div>

      <div className="max-w-3xl">
        <p className="mb-8 text-lg">
          Unwrapza (“we”, “our”, “us”) is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, store, and protect information
          when you use our website.
        </p>

        {/* UNIVERSAL AFFILIATE COMPLIANCE DISCLAIMER - Aangepast naar jouw groen */}
        <div className="p-6 bg-gray-50 border-l-4 border-[#44A77D] rounded-r-2xl mb-10">
          <p className="font-bold text-gray-900 mb-2">
            Unwrapza is an independent platform and is not affiliated with any retailer or brand.
          </p>
          <p className="text-sm">
            All purchases are completed on external partner websites. 
            For questions about orders, returns, delivery, or payments, please contact 
            the respective retailer directly.
          </p>
        </div>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">1. Information We Collect</h2>
            <p className="mb-4">
              Unwrapza collects non-personal, anonymized data to improve functionality and user experience.
            </p>
            
            <div className="space-y-4 ml-2">
              <h3 className="font-bold text-gray-900 mb-1">1.1 Automatically collected data</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#44A77D] rounded-full"></div> Anonymized IP address
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#44A77D] rounded-full"></div> Browser and device type
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#44A77D] rounded-full"></div> Pages visited
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#44A77D] rounded-full"></div> Search queries
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#44A77D] rounded-full"></div> Product clicks (affiliate)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#44A77D] rounded-full"></div> Technical logs
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-gray-900 mb-2">1.2 Cookies and tracking</h3>
              <p>
                We use functional cookies, analytics cookies, and affiliate tracking cookies.
                We do not collect personal information unless explicitly provided.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">2. How We Use Collected Data</h2>
            <p>
              We use anonymized data to improve search results, measure engagement,
              analyze performance, and ensure functioning affiliate tracking.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">3. Affiliate Tracking</h2>
            <p className="mb-4">
              When clicking product links, external retailers or affiliate networks may 
              place tracking cookies. Unwrapza never shares personal information with 
              retailers and does not control how external parties process data.
            </p>
            <p className="text-sm bg-gray-50 p-4 rounded-xl italic">
              Unwrapza only redirects users to external retailer websites via affiliate links.
              We do not influence product prices, availability, descriptions, or customer service 
              processes of any retailer.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">4. Data Storage & Security</h2>
            <p>
              We use secure cloud services (Firebase) and HTTPS encryption. All stored data is
              anonymized and protected through strict security rules.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">5. Sharing of Data</h2>
            <p>
              Unwrapza does not sell or share personal data. Only anonymous analytics
              or click data may be shared with affiliate networks for reporting purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">6. Data Retention</h2>
            <p>
              We retain anonymized data for no longer than 12 months.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">7. Your Rights</h2>
            <p>
              If personal data is ever collected, you may request access, deletion,
              correction, or withdrawal of consent. Contact us at <strong className="text-[#44A77D]">contact@unwrapza.com</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">8. External Links</h2>
            <p>
              Unwrapza links to third-party websites. We are not responsible for their privacy policies
              or data handling practices.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">10. Contact</h2>
            <p>
              For privacy-related inquiries, contact us at <strong className="text-[#44A77D]">contact@unwrapza.com</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;