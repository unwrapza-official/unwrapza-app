const CookiePolicy = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-20 text-gray-700 leading-relaxed">
      {/* Header: Exact dezelfde stijl als Privacy Policy */}
      <div className="flex flex-col mb-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
          Cookie <span className="text-[#44A77D]">Policy</span>
        </h1>
        <div className="h-1.5 w-16 bg-[#44A77D] rounded-full"></div>
        <p className="mt-6 text-sm font-medium text-gray-400">Last updated: 3-12-2025</p>
      </div>

      <div className="max-w-3xl">
        <p className="mb-8 text-lg">
          This Cookie Policy explains how Unwrapza uses cookies and similar technologies to operate and improve our website.
          By using Unwrapza, you consent to the cookies described below.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help websites function properly 
              and provide usage insights. Cookies used on Unwrapza do not identify you personally.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">2. Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="p-5 bg-gray-50 rounded-2xl border-l-4 border-[#44A77D]">
                <h3 className="font-bold text-gray-900 mb-2">2.1 Functional Cookies</h3>
                <p className="text-sm">
                  These cookies are essential for operating the website. They enable navigation, preferences, and stable performance. 
                  They cannot be disabled as the site will not function correctly without them.
                </p>
              </div>

              <div className="p-5 bg-gray-50 rounded-2xl border-l-4 border-[#44A77D]">
                <h3 className="font-bold text-gray-900 mb-2">2.2 Analytics Cookies (Anonymous)</h3>
                <p className="text-sm">
                  These cookies help us understand how users interact with Unwrapza, including page views, search queries, and product clicks. 
                  All analytics data is anonymous and used solely to improve the website.
                </p>
              </div>

              <div className="p-5 bg-gray-50 rounded-2xl border-l-4 border-[#44A77D]">
                <h3 className="font-bold text-gray-900 mb-2">2.3 Affiliate Tracking Cookies</h3>
                <p className="text-sm">
                  When you click a product link that redirects to a retailer (e.g., bol.com), that retailer may place an affiliate cookie. 
                  These cookies track referrals so that we may earn a commission. They do not collect personal data and are controlled by retailers.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">3. Third-Party Cookies</h2>
            <p>
              Third-party cookies may be set by retailers we link to. Unwrapza does not control these cookies. Users should review 
              the cookie policies of the retailer's website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">4. Control Over Cookies</h2>
            <p>
              You can block or delete cookies through your browser settings. However, disabling cookies may affect website functionality, 
              particularly affiliate redirects.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">5. No Advertising or Personal Tracking</h2>
            <p>
              Unwrapza does not use marketing cookies, personal tracking cookies, or retargeting technologies. Only functional, anonymous 
              analytics, and affiliate tracking cookies are used.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">6. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy occasionally. Continued use of Unwrapza indicates acceptance of any changes.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">7. Contact Us</h2>
            <p>
              For questions or concerns regarding this Cookie Policy, contact us at{" "}
              <strong className="text-[#44A77D]">contact@unwrapza.com</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;