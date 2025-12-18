const WhyUnwrapza = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 py-12 mb-15 ">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
        Why Unwrapza?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        
        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl">🤖</span>
          <h3 className="text-lg font-semibold">
            AI-powered gift finder
          </h3>
          <p className="text-gray-600 text-sm">
            Tell us who it’s for and your budget. Our AI finds the best gifts in seconds.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl">🌍</span>
          <h3 className="text-lg font-semibold">
            Compare stores across Europe
          </h3>
          <p className="text-gray-600 text-sm">
            We search multiple trusted platforms to find the best options available.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl">💸</span>
          <h3 className="text-lg font-semibold">
            Smart picks, real prices
          </h3>
          <p className="text-gray-600 text-sm">
            No fake discounts. No sponsored rankings. Just honest gift suggestions.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyUnwrapza;
