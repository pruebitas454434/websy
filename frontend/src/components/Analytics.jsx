import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  const trackEvent = (eventName, parameters = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  };

  const trackConversion = (conversionId, value = null) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.REACT_APP_GA_TRACKING_ID}/${conversionId}`,
        value: value,
        currency: 'USD',
      });
    }
  };

  return { trackEvent, trackConversion };
};

// Error tracking hook
export const useErrorTracking = () => {
  const trackError = (error, errorInfo = null, context = {}) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', error, errorInfo, context);
    }

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
        custom_map: {
          error_message: error.message,
          error_stack: error.stack,
          component_stack: errorInfo?.componentStack,
          ...context
        }
      });
    }

    // Here you could send to error reporting services like Sentry
    // Sentry.captureException(error, { contexts: { react: errorInfo }, extra: context });
  };

  const trackUserAction = (action, details = {}) => {
    if (window.gtag) {
      window.gtag('event', action, {
        ...details,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return { trackError, trackUserAction };
};

// Performance monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const reportWebVitals = (metric) => {
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.value * 1000) / 1000,
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }
    };

    // Report LCP (Largest Contentful Paint)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          reportWebVitals({
            name: 'LCP',
            value: entry.startTime,
            id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
          });
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observation not supported');
    }

    // Report FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVitals({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
        });
      }
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observation not supported');
    }

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  const measureTiming = (name, startTime, endTime = performance.now()) => {
    const duration = endTime - startTime;

    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name,
        value: Math.round(duration),
        event_category: 'Performance'
      });
    }

    return duration;
  };

  return { measureTiming };
};

// A/B Testing hook
export const useABTesting = () => {
  const getVariant = (experimentId, variants = []) => {
    // Simple A/B testing implementation
    // In production, you'd use a proper A/B testing service
    const userId = localStorage.getItem('userId') || Math.random().toString(36).substr(2, 9);
    const variantIndex = userId.charCodeAt(0) % variants.length;
    const variant = variants[variantIndex];

    // Track experiment participation
    if (window.gtag) {
      window.gtag('event', 'experiment_impression', {
        experiment_id: experimentId,
        variant_id: variant,
      });
    }

    return variant;
  };

  const trackConversion = (experimentId, variant, conversionType) => {
    if (window.gtag) {
      window.gtag('event', 'experiment_conversion', {
        experiment_id: experimentId,
        variant_id: variant,
        conversion_type: conversionType,
      });
    }
  };

  return { getVariant, trackConversion };
};

// User feedback collection
export const useFeedback = () => {
  const collectFeedback = (type, message, metadata = {}) => {
    const feedback = {
      type,
      message,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...metadata
    };

    // Store locally for now (in production, send to backend)
    const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));

    // Track in analytics
    if (window.gtag) {
      window.gtag('event', 'feedback_submitted', {
        feedback_type: type,
        feedback_length: message.length,
      });
    }

    return feedback;
  };

  const getStoredFeedback = () => {
    return JSON.parse(localStorage.getItem('userFeedback') || '[]');
  };

  return { collectFeedback, getStoredFeedback };
};