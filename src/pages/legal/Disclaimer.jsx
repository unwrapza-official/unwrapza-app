const Disclaimer = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-20 text-gray-700 leading-relaxed">
      {/* Header: Exact dezelfde stijl als de rest van de site */}
      <div className="flex flex-col mb-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
          Affiliate <span className="text-[#44A77D]">Disclaimer</span>
        </h1>
        <div className="h-1.5 w-16 bg-[#44A77D] rounded-full"></div>
        <p className="mt-6 text-sm font-medium text-gray-400">Last updated: 3-12-2025</p>
      </div>

      <div className="max-w-3xl">
        {/* Belangrijkste punt bovenaan in een opvallend kader */}
        <div className="p-6 bg-gray-50 border-l-4 border-[#44A77D] rounded-r-2xl mb-10 text-lg">
          <p className="font-bold text-gray-900">
            Unwrapza may earn a commission when you make a purchase through our links, at <span className="text-[#44A77D]">no additional cost</span> to you.
          </p>
        </div>

        <p className="mb-8">
          Unwrapza contains affiliate links, including links to bol.com and other retail partners.
          This means that when you click on a link and make a purchase on a partner website,
          Unwrapza may earn a commission.
        </p>

        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">How affiliate links work</h2>
            <p>
              When you click an affiliate link, a tracking cookie or click-ID may be used so that the
              retailer knows that Unwrapza referred you. No personal information is collected by
              Unwrapza during this process.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">No influence on product ranking</h2>
            <p>
              Affiliate partnerships do not influence which products we show, the order in which
              products appear, our recommendations, or product visibility. All product listings
              are selected independently based on relevance, user experience, and quality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">Price and availability</h2>
            <p>
              Prices, availability, and product information displayed on Unwrapza come from external
              retailers and may change at any time. Always check the final details on the retailer’s
              website before completing a purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">No extra cost to users</h2>
            <p>
              Any commission earned through affiliate links never increases the price you pay for a product.
              The price remains exactly the same as if you visited the retailer directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">Our goal</h2>
            <p>
              Unwrapza aims to help users find the best gifts quickly and easily, while providing
              a clear and trustworthy product discovery experience.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-gray-900 font-medium">
              If you have questions about how affiliate links work, you can contact us at:
            </p>
            <p className="mt-2 text-lg font-bold text-[#44A77D]">
              contact@unwrapza.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;