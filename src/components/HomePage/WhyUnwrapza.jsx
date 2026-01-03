import { Bot, Globe, BadgeEuro, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhyUnwrapza = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-sm font-bold text-[#44A77D] uppercase tracking-[0.2em] mb-3">
            The Benefits
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why choose <span className="text-[#44A77D]">Unwrapza?</span>
          </h2>
          <div className="h-1.5 w-16 bg-[#44A77D] rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1: AI */}
          <div className="group relative p-8 rounded-3xl bg-[#FBFBFB] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Bot className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              AI-powered gift finder
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Stop guessing. Tell us who it’s for and your budget, and our AI scans 
              thousands of options to find the perfect match in seconds.
            </p>
          </div>

          {/* Card 2: Globe */}
          <div className="group relative p-8 rounded-3xl bg-[#FBFBFB] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <Globe className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Smart product comparison
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              We analyze products across multiple sources to help you discover the best options,
              without limiting you to a single platform.
            </p>
          </div>

          {/* Card 3: Prices */}
          <div className="group relative p-8 rounded-3xl bg-[#FBFBFB] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <BadgeEuro className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Smart picks, real prices
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Integrity first. No fake discounts or paid rankings. Just honest, 
              data-driven suggestions that fit your actual budget.
            </p>
          </div>

        </div>

        {/* Optional Call to Action link below the grid */}
        <div className="mt-16 text-center">
          <Link to="/about">
            <button className="inline-flex items-center gap-2 text-[#44A77D] font-bold hover:gap-3 transition-all underline underline-offset-8 decoration-2 cursor-pointer">
                Learn more about us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
            
        </div>
      </div>
    </section>
  );
};

export default WhyUnwrapza;