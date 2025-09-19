import React from 'react';

export const LoadingSkeleton = ({
  className = '',
  variant = 'default',
  lines = 1,
  animate = true
}) => {
  const baseClasses = animate
    ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-size-200 bg-pos-0 animate-shimmer rounded"
    : "bg-gray-700 rounded";

  const variants = {
    default: "h-4 w-full",
    circle: "rounded-full w-12 h-12",
    card: "h-48 w-full rounded-lg",
    text: "h-4 w-3/4",
    title: "h-8 w-1/2",
    avatar: "rounded-full w-10 h-10",
    button: "h-10 w-24 rounded-md",
    image: "h-32 w-full rounded-lg",
    paragraph: "h-4 w-full mb-2"
  };

  if (variant === 'paragraph' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variants.paragraph} ${
              i === lines - 1 ? 'w-2/3' : ''
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="text-center">
        <div className="relative">
          {/* Enhanced Animated Logo */}
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-lime-400/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-lime-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-yellow-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-lime-400 to-yellow-400 flex items-center justify-center shadow-lg">
              <span className="text-gray-900 font-bold text-xl">W</span>
            </div>
          </div>

          {/* Loading Text with Animation */}
          <div className="text-white text-xl font-semibold mb-4 animate-pulse">
            Cargando Websy
          </div>

          {/* Enhanced Progress Bar */}
          <div className="w-64 h-3 bg-gray-700 rounded-full mx-auto overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-lime-400 via-yellow-400 to-lime-400 rounded-full animate-progress shadow-lg"></div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for specific components
export const ServiceCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl h-40 md:h-48 lg:h-56 bg-gray-800 border border-gray-700 p-4 md:p-6">
    <LoadingSkeleton variant="circle" className="w-12 h-12 md:w-14 md:h-14 mb-4" />
    <LoadingSkeleton variant="title" className="mb-3" />
    <LoadingSkeleton variant="paragraph" lines={2} />
  </div>
);

export const PortfolioCardSkeleton = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
    <LoadingSkeleton variant="image" className="h-48" />
    <div className="p-4">
      <LoadingSkeleton variant="title" className="mb-2" />
      <LoadingSkeleton variant="text" className="mb-3" />
      <div className="flex space-x-2">
        <LoadingSkeleton variant="button" />
        <LoadingSkeleton variant="button" />
      </div>
    </div>
  </div>
);