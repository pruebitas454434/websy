import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSmoothScroll } from './UXEnhancements';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-20 right-4 z-40 w-12 h-12 bg-gradient-to-r from-lime-400 to-yellow-400 text-gray-900 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Volver arriba"
    >
      <ChevronUp size={20} className="mx-auto" />
    </button>
  );
};