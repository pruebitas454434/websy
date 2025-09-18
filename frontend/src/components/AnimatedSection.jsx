import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  ...props 
}) => {
  const [ref, isVisible, hasBeenVisible] = useIntersectionObserver({ threshold });

  return (
    <div
      ref={ref}
      className={`
        ${className}
        ${hasBeenVisible ? animation : 'opacity-0 translate-y-4'}
        transition-all duration-700 ease-out
      `}
      style={{ 
        transitionDelay: hasBeenVisible ? `${delay}ms` : '0ms',
        ...props.style 
      }}
      {...props}
    >
      {children}
    </div>
  );
};