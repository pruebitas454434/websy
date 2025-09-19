import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export const SEOHead = ({
  title,
  description,
  keywords,
  image = '/websy-logo.png',
  url,
  type = 'website'
}) => {
  const { currentLanguage } = useLanguage();

  const siteName = 'Websy - Agencia de Desarrollo Web';
  const defaultDescription = currentLanguage === 'es'
    ? 'Creamos aplicaciones web, móviles y sistemas personalizados que impulsan el crecimiento de tu negocio con tecnología de vanguardia.'
    : 'We create web, mobile applications and custom systems that drive your business growth with cutting-edge technology.';

  const finalTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDescription = description || defaultDescription;
  const finalUrl = url || window.location.href;
  const finalImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', keywords || 'desarrollo web, aplicaciones móviles, sistemas personalizados, agencia digital');
    updateMetaTag('author', 'Websy');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', currentLanguage);

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:url', finalUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', currentLanguage === 'es' ? 'es_ES' : 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:site', '@websy_agency');

    // Additional meta tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#d9fb06');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', finalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', finalUrl);
      document.head.appendChild(canonicalLink);
    }

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Websy",
      "description": finalDescription,
      "url": window.location.origin,
      "logo": `${window.location.origin}/websy-logo.png`,
      "sameAs": [
        "https://wa.me/5493884846695"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+54-9-388-484-6695",
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English", "Chinese", "Japanese"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AR",
        "addressRegion": "Salta"
      },
      "foundingDate": "2023",
      "knowsAbout": [
        "Web Development",
        "Mobile Applications",
        "Custom Software",
        "E-commerce",
        "SEO",
        "Digital Marketing"
      ]
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(structuredData);
    } else {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(jsonLdScript);
    }

  }, [finalTitle, finalDescription, finalImage, finalUrl, type, keywords, currentLanguage]);

  return null; // This component doesn't render anything
};

// Hook for dynamic SEO updates
export const useSEO = (seoData) => {
  useEffect(() => {
    if (seoData.title) {
      document.title = seoData.title;
    }

    Object.entries(seoData).forEach(([key, value]) => {
      if (key !== 'title' && value) {
        const metaTag = document.querySelector(`meta[name="${key}"]`) ||
                        document.querySelector(`meta[property="${key}"]`);
        if (metaTag) {
          metaTag.setAttribute('content', value);
        }
      }
    });
  }, [seoData]);
};