import { Sparkles } from "lucide-react";

const AIInformation = () => {
  return (
    // ✅ Behoudt de exacte schaal en padding van je origineel
    <div className="w-full flex flex-col items-center justify-center py-20 text-center scale-[1.15]">

      {/* Magisch Icoon met gelaagde gloed */}
      <div className="relative mb-9 group">
        {/* Meerdere lagen licht voor diepte */}
        <div className="absolute inset-0 rounded-full blur-3xl bg-white/40 animate-pulse" />
        <div className="absolute -inset-2 rounded-full blur-2xl bg-[#4FAF8E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div
          className="
            relative w-16 h-16 rounded-[1.25rem]
            bg-gradient-to-br from-white to-white/90
            backdrop-blur-sm
            flex items-center justify-center
            shadow-[0_10px_25px_rgba(0,0,0,0.12)]
            border border-white/60
            transition-all duration-500
            group-hover:-translate-y-1 group-hover:rotate-[8deg]
          "
        >
          <Sparkles className="w-8 h-8 text-[#4FAF8E] drop-shadow-[0_0_8px_rgba(79,175,142,0.3)]" />
          
          {/* Subtiel zwevend elementje */}
          <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-[#4FAF8E] rounded-full shadow-[0_0_10px_#4FAF8E] animate-bounce" />
        </div>
      </div>

      {/* Typografie met meer karakter */}
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Let AI find the 
          <span className="relative inline-block ml-2">
            perfect
            {/* Elegant krabbel-lijntje onder 'perfect' */}
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#4FAF8E]/60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
          {" "}gift
        </h2>
      </div>

      {/* Paragraaf met verfijnde witruimte */}
      <p className="mt-6 max-w-md text-sm md:text-base text-white/90 leading-relaxed font-medium">
        Tell us who it’s for, the occasion and your budget.
        <span className="block text-[#4FAF8E] brightness-125 font-bold mt-1">
          We’ll take care of the rest.
        </span>
      </p>

      {/* Premium Badge onderaan */}
      <div className="mt-8 relative group cursor-default">
        <div className="absolute inset-0 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative px-4 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-300 group-hover:border-white/40">
          <span className="text-[10px] tracking-[0.25em] text-white/90 uppercase font-extrabold flex items-center gap-2">
            <span className="w-1 h-1 bg-[#4FAF8E] rounded-full animate-ping" />
            Unwrapza AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIInformation;