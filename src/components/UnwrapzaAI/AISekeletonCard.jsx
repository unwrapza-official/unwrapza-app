const SkeletonBox = ({ className }) => (
  <div className={`bg-neutral-800/40 animate-pulse rounded-md ${className}`} />
);

const AISkeletonCard = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-4">

      {/* Left card */}
      <div className="w-full md:w-1/4 h-72 md:h-85 rounded-xl bg-neutral-900/30 p-4 flex flex-col gap-3 animate-pulse">
        <SkeletonBox className="w-full h-32 md:h-28 rounded-lg" />
        <SkeletonBox className="w-3/4 h-3" />
        <SkeletonBox className="w-1/2 h-3" />
        <SkeletonBox className="w-full h-8 rounded-lg mt-auto" />
      </div>

      {/* Middle big card */}
      <div className="w-full md:w-1/3 h-96 md:h-110 rounded-xl bg-neutral-900/30 p-5 flex flex-col gap-4 animate-pulse">
        <SkeletonBox className="w-full h-48 md:h-40 rounded-lg" />
        <SkeletonBox className="w-full h-4" />
        <SkeletonBox className="w-4/5 h-4" />
        <SkeletonBox className="w-3/5 h-4" />
        <div className="flex gap-2 mt-auto">
          <SkeletonBox className="w-1/2 h-10 rounded-lg" />
          <SkeletonBox className="w-1/2 h-10 rounded-lg" />
        </div>
      </div>

      {/* Right card */}
      <div className="w-full md:w-1/4 h-72 md:h-85 rounded-xl bg-neutral-900/30 p-4 flex flex-col gap-3 animate-pulse">
        <SkeletonBox className="w-full h-32 md:h-28 rounded-lg" />
        <SkeletonBox className="w-3/4 h-3" />
        <SkeletonBox className="w-1/2 h-3" />
        <SkeletonBox className="w-full h-8 rounded-lg mt-auto" />
      </div>

    </div>
  );
};

export default AISkeletonCard;
