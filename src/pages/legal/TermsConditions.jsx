const TermsConditions = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-20 text-gray-700 leading-relaxed">
      {/* Header: Consistent met de rest van de site */}
      <div className="flex flex-col mb-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
          Terms & <span className="text-[#44A77D]">Conditions</span>
        </h1>
        <div className="h-1.5 w-16 bg-[#44A77D] rounded-full"></div>
        <p className="mt-6 text-sm font-medium text-gray-400">Last updated: 3-12-2025</p>
      </div>

      <div className="max-w-3xl">
        <p className="mb-8 text-lg font-medium text-gray-800">
          Welcome to Unwrapza. By accessing or using our website, you agree to the following Terms & Conditions. 
          Please read them carefully.
        </p>

        <section className="space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">1. Introduction</h2>
            <p className="mb-4">
              Unwrapza is a gift-discovery platform that displays products from external retailers such as bol.com and 
              other affiliate partners. We do not sell products directly. All purchases are completed on the retailer’s website.
            </p>
            <p>
              By using Unwrapza, you accept these Terms & Conditions and agree to comply with them.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">2. Use of the Website</h2>
            <p>
              You may use Unwrapza only for personal, non-commercial purposes. You agree not to misuse or disrupt the website, 
              scrape content, bypass tracking systems, or engage in illegal activity. We may restrict access if rules are violated.
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-[#44A77D]">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">3. External Retailers</h2>
            <p className="text-sm">
              Unwrapza displays products from independent retailers. We are not responsible for order processing, shipping, 
              product quality, refunds, warranty, or pricing. All purchases occur directly between you and the retailer.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">4. Product Information Accuracy</h2>
            <p>
              Product information may change and is provided by external retailers. Unwrapza cannot guarantee accuracy or 
              completeness. Always verify details on the retailer’s website before purchasing.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">5. Affiliate Links</h2>
            <p>
              Unwrapza participates in affiliate programs and may earn commissions from purchases made through affiliate links. 
              These commissions never increase your price and do not influence product ranking.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">6. Privacy & Cookies</h2>
            <p>
              Your use of Unwrapza is governed by our Privacy Policy, Cookie Policy, and Affiliate Disclaimer, which explain 
              data usage and affiliate tracking.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">7. Intellectual Property</h2>
            <p>
              All branding, UI, design, code, and content belong to Unwrapza. You may not copy, reproduce, or redistribute 
              site content without permission.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">8. Limitation of Liability</h2>
            <p>
              Unwrapza is provided “as is” without warranties. We are not liable for incorrect product information, delays, 
              data loss, or damages from using third-party websites.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">9. Changes to These Terms</h2>
            <p>
              We may update these Terms & Conditions at any time. Continued use of Unwrapza implies acceptance of updated terms.
            </p>
          </div>

          {/* Section 10 */}
          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">10. Contact Information</h2>
            <p>
              If you have questions, contact us at <strong className="text-[#44A77D]">contact@unwrapza.com</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;