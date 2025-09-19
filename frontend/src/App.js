import React, { Suspense } from "react";
import "./App.css";
import { LanguageProvider } from "./LanguageContext";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { AboutSection } from "./components/AboutSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { SEOHead } from "./components/SEOHead";
import { SkipLinks } from "./components/Accessibility";
import { LoadingProvider, ErrorBoundary, ToastProvider } from "./components/UXEnhancements";
import { PageLoader } from "./components/LoadingSkeleton";
import useAdminPanel from "./hooks/useAdminPanel";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

// Lazy load heavy components
const LazyPortfolioSection = React.lazy(() => import('./components/PortfolioSection').then(module => ({ default: module.PortfolioSection })));
const LazyTestimonialsSection = React.lazy(() => import('./components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));

function App() {
  const {
    showLogin,
    showPanel,
    handleLogin,
    handleLogout,
    closeLogin,
    closePanel
  } = useAdminPanel();

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <LoadingProvider>
          <ToastProvider>
            <div className="App" id="main-content">
              <SEOHead
                title="Websy - Agencia de Desarrollo Web Profesional"
                description="Creamos aplicaciones web, móviles y sistemas personalizados que impulsan el crecimiento de tu negocio con tecnología de vanguardia. Desarrollo web profesional en Argentina."
                keywords="desarrollo web, aplicaciones móviles, sistemas personalizados, agencia digital, Argentina, Salta, e-commerce, SEO, automatización"
                type="website"
              />

              <SkipLinks />

              <Navigation />

              <HeroSection />

              <ServicesSection />

              <Suspense fallback={<PageLoader />}>
                <LazyPortfolioSection />
              </Suspense>

              <AboutSection />

              <Suspense fallback={<PageLoader />}>
                <LazyTestimonialsSection />
              </Suspense>

              <ContactSection />

              <Footer />

              <WhatsAppButton />
              <ScrollToTop />

              {/* Admin System */}
              {showLogin && (
                <AdminLogin
                  onLogin={handleLogin}
                  onClose={closeLogin}
                />
              )}

              {showPanel && (
                <AdminPanel
                  onClose={closePanel}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </ToastProvider>
        </LoadingProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;