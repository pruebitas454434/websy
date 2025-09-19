import React, { useState, useRef, useEffect } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';

export const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <LoadingSkeleton
          className={`absolute inset-0 ${placeholderClassName}`}
          variant="card"
        />
      )}

      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}

      {hasError && (
        <div className={`flex items-center justify-center bg-gray-800 text-gray-400 ${className}`}>
          <span className="text-sm">Error al cargar imagen</span>
        </div>
      )}
    </div>
  );
};

// Componente para imágenes críticas (sin lazy loading)
export const CriticalImage = ({
  src,
  alt,
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <LoadingSkeleton className="absolute inset-0" variant="card" />
      )}

      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {hasError && (
        <div className="flex items-center justify-center bg-gray-800 text-gray-400">
          <span className="text-sm">Error al cargar imagen</span>
        </div>
      )}
    </div>
  );
};