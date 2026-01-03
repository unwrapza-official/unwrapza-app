import { Gift, Target, Zap, Heart, ShieldCheck, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen w-full max-w-[1200px] mx-auto py-20 px-4">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            About Unwrapza
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are a modern gift-discovery platform designed to help you find the perfect present 
            quickly, easily, and intelligently. No more endless scrolling—just curated ideas.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-[#44A77D]/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-[#44A77D] w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To make gift-giving effortless. Whether it's a birthday, holiday, or anniversary, 
              we provide relevant suggestions without the overwhelm.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-[#44A77D]/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="text-[#44A77D] w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">How it Works</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We analyze products from trusted retailers and organize them beautifully, 
              tailored specifically for gifting and ease of browsing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-[#44A77D]/10 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-[#44A77D] w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Unbiased Results</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Product visibility is independent of partnerships. We never alter search 
              results based on paid placements or advertisements.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-2 gap-16 items-center border-t border-gray-200 pt-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why we built Unwrapza</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Gift shopping is often stressful: too many choices, too little time. We wanted 
                to create a platform that feels modern, intuitive, and reduces decision fatigue.
              </p>
              <p>
                Every piece of Unwrapza is built with a single goal: making gift discovery 
                simpler and more enjoyable for everyone.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 w-fit">
              <div className="bg-[#44A77D] p-2 rounded-full text-white">
                <Heart size={16} fill="currentColor" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Built with passion in the Netherlands</span>
            </div>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
             {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[#44A77D] opacity-20 blur-[80px]" />
            
            <h2 className="text-2xl font-bold mb-6 relative z-10">Affiliate Partnerships</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10">
              To keep Unwrapza free for everyone, we participate in affiliate programs with 
              partners like Awin.com. We may earn a commission when you purchase through our 
              links—at no extra cost to you.
            </p>
            
            <div className="pt-8 border-t border-white/10 relative z-10">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Get in touch</p>
              <a 
                href="mailto:contact@unwrapza.com" 
                className="flex items-center gap-3 text-[#44A77D] hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium underline underline-offset-4">contact@unwrapza.com</span>
              </a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default About;