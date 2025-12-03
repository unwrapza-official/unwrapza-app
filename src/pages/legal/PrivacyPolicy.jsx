const PrivacyPolicy = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Last updated: <em>[fill in date]</em></p>

      <p className="mb-6">
        Unwrapza (“we”, “our”, “us”) is committed to protecting your privacy. 
        This Privacy Policy explains how we collect, use, store, and protect information when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        Unwrapza collects non-personal, anonymized data to improve functionality and user experience.
      </p>

      <h3 className="font-semibold mb-1">1.1 Automatically collected data</h3>
      <ul className="list-disc list-inside mb-4">
        <li>anonymized IP address</li>
        <li>browser and device type</li>
        <li>pages visited</li>
        <li>search queries</li>
        <li>product clicks (affiliate clicks)</li>
        <li>timestamps</li>
        <li>technical logs</li>
      </ul>

      <h3 className="font-semibold mb-1">1.2 Cookies and tracking</h3>
      <p className="mb-4">
        We use functional cookies, analytics cookies, and affiliate tracking cookies. 
        We do not collect personal information unless explicitly provided.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Collected Data</h2>
      <p className="mb-4">
        We use anonymized data to improve search results, measure engagement, analyze performance, and ensure functioning affiliate tracking.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Affiliate Tracking</h2>
      <p className="mb-4">
        When clicking product links, external retailers may place tracking cookies. 
        Unwrapza never shares personal information with retailers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Storage & Security</h2>
      <p className="mb-4">
        We use secure cloud services (Firebase) and HTTPS encryption. All stored data is anonymized and restricted by secure rules.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Sharing of Data</h2>
      <p className="mb-4">
        Unwrapza does not sell or share personal data. Only anonymous analytics or click data may be shared with affiliate networks.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Retention</h2>
      <p className="mb-4">
        We retain anonymized data for no longer than 12 months.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <p className="mb-4">
        If personal data is ever collected, you may request access, deletion, correction, or withdrawal of consent.
        Contact us at info@unwrapza.com with any requests.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. External Links</h2>
      <p className="mb-4">
        Unwrapza links to third-party websites. We are not responsible for their privacy practices.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes</h2>
      <p className="mb-4">
        We may update this Privacy Policy at any time. Continued use of Unwrapza implies acceptance of these changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact</h2>
      <p className="mb-4">
        For privacy-related inquiries, contact us at <strong>info@unwrapza.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
