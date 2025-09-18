import React from 'react';

export const LoadingSkeleton = ({ className, variant = 'default' }) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-size-200 bg-pos-0 animate-shimmer rounded";
  
  const variants = {
    default: "h-4 w-full",
    circle: "rounded-full w-12 h-12",
    card: "h-48 w-full rounded-lg",
    text: "h-4 w-3/4",
    title: "h-8 w-1/2"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="relative">
          {/* Animated Logo */}
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-lime-400/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-lime-400 animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-lime-400 flex items-center justify-center">
              <span className="text-gray-900 font-bold text-xl">W</span>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="text-white text-xl font-semibold mb-4">
            Cargando Websy
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-lime-400 to-yellow-400 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};