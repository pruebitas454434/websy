import { useEffect, useRef } from 'react';

// Hook para manejar el foco y navegación por teclado
export const useKeyboardNavigation = (isOpen, onClose) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements?.length) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return containerRef;
};

// Hook para anunciar cambios a lectores de pantalla
export const useScreenReaderAnnouncement = () => {
  const announce = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);
    announcement.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return announce;
};

// Hook para manejar el foco al abrir/cerrar modales
export const useFocusManagement = (isOpen) => {
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  return previousFocusRef;
};

// Componente para botones accesibles
export const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente para enlaces accesibles
export const AccessibleLink = ({
  children,
  href,
  ariaLabel,
  isExternal = false,
  className = '',
  ...props
}) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel || (isExternal ? `${children} (abre en nueva ventana)` : children)}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
      {isExternal && (
        <span className="sr-only"> (abre en nueva ventana)</span>
      )}
    </a>
  );
};

// Componente para secciones con landmarks
export const Section = ({
  children,
  title,
  id,
  className = '',
  as: Component = 'section',
  ...props
}) => {
  return (
    <Component
      id={id}
      className={className}
      aria-labelledby={title ? `${id}-title` : undefined}
      {...props}
    >
      {title && (
        <h2 id={`${id}-title`} className="sr-only">
          {title}
        </h2>
      )}
      {children}
    </Component>
  );
};

// Hook para detectar reducción de movimiento
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Componente para skip links (enlaces de omisión)
export const SkipLinks = () => {
  return (
    <nav aria-label="Enlaces de navegación rápida" className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-50 bg-lime-400 text-gray-900 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
      >
        Ir al contenido principal
      </a>
      <a
        href="#navigation"
        className="fixed top-16 left-4 z-50 bg-lime-400 text-gray-900 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
      >
        Ir a la navegación
      </a>
    </nav>
  );
};