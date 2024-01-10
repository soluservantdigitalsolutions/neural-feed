const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-52 bg-gray-400 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-400 rounded"></div>
      <div className="h-4 bg-gray-400 rounded w-5/6"></div>
    </div>
  </div>
);

export default SkeletonLoader;
