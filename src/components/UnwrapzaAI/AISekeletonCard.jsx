import { Sparkles, Gift } from "lucide-react";


const AISkeletonCard = () => {
   return (
    <div className="w-full flex flex-col items-center justify-center py-20 text-center scale-[1.15]">

      {/* Soft halo */}
      <div className="relative mb-9">
        <div className="absolute inset-0 rounded-full blur-3xl bg-white/40" />
        <div
          className="
            relative w-16 h-16 rounded-full
            bg-white/85
            flex items-center justify-center
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          "
        >
          <Sparkles className="w-8 h-8 text-[#4FAF8E]" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
        Let AI find the perfect gift
      </h2>

      <p className="mt-4 max-w-md text-sm md:text-base text-white/85 leading-relaxed">
        Tell us who it’s for, the occasion and your budget.
        <br />
        We’ll take care of the rest.
      </p>

      <div className="mt-7 text-[11px] tracking-widest text-white/75 uppercase">
        Unwrapza AI
      </div>
    </div>
  );
};

export default AISkeletonCard;
