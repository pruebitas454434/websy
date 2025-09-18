import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  ShoppingBag, 
  Settings, 
  Lightbulb, 
  Shield,
  Star,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const iconMap = {
  Globe: Code2,        // Diseño Web - Código moderno
  ShoppingCart: ShoppingBag,  // E-commerce - Bolsa de compras moderna
  Settings: Settings,   // Sistemas de Gestión - Configuración
  Lightbulb: Lightbulb, // SEO y E-Learning - Bombilla/Ideas
  Wrench: Shield       // Automatizaciones - Escudo de protección
};

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  // Services data using translation keys - reorganized for better UX
  const servicesData = [
    // First row - User-friendly services
    {
      id: 'webDesign',
      translationKey: 'services.webDesign',
      icon: 'Globe'
    },
    {
      id: 'ecommerce',
      translationKey: 'services.ecommerce',
      icon: 'ShoppingCart'
    },
    {
      id: 'elearning',
      translationKey: 'services.elearning',
      icon: 'Lightbulb'
    },
    // Second row - Technical services
    {
      id: 'management',
      translationKey: 'services.management',
      icon: 'Settings'
    },
    {
      id: 'seo',
      translationKey: 'services.seo',
      icon: 'Lightbulb'
    },
    {
      id: 'automation',
      translationKey: 'services.automation',
      icon: 'Wrench'
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleContactClick = () => {
    setIsModalOpen(false);
    document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicios" className="py-12 md:py-16 lg:py-20 xl:py-24" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase tracking-wider" style={{ color: 'var(--brand-primary)' }}>
            {t('services.title')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            {t('services.subtitle')}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('services.description')}
          </p>
        </div>

        {/* Responsive services grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const serviceTitle = t(`${service.translationKey}.title`);
            const serviceDescription = t(`${service.translationKey}.description`);
            
            return (
              <div 
                key={service.id} 
                className="relative overflow-hidden cursor-pointer transition-all duration-500 group hover:scale-105 hover:shadow-2xl bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 text-center min-h-[320px] md:min-h-[360px] lg:min-h-[400px] flex flex-col justify-between hover:border-yellow-400"
                onClick={() => handleServiceClick(service)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Gradiente de fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Contenido principal */}
                <div className="relative z-10">
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-3xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      background: `linear-gradient(135deg, var(--brand-primary), var(--secondary-yellow))`,
                      boxShadow: '0 10px 30px rgba(217, 251, 6, 0.3)'
                    }}
                  >
                    <IconComponent size={24} className="md:w-8 md:h-8 lg:w-10 lg:h-10" style={{ color: 'var(--text-inverse)' }} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                    {serviceTitle}
                  </h3>
                  
                  <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {serviceDescription.length > 120 
                      ? `${serviceDescription.substring(0, 120)}...` 
                      : serviceDescription
                    }
                  </p>
                </div>

                {/* Botón de acción responsive */}
                <div className="relative z-10">
                  <button 
                    className="w-full py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-900 text-sm md:text-base"
                    style={{ 
                      backgroundColor: 'var(--border-medium)', 
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    Ver más detalles
                    <ArrowRight size={16} className="md:w-5 md:h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Indicador visual de posición en móvil */}
                <div className="absolute top-4 right-4 md:hidden">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-60"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action responsive */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-white">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ofrecemos soluciones personalizadas para cada necesidad. Contáctanos y cuéntanos tu proyecto.
          </p>
          <button 
            onClick={handleContactClick}
            className="px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base lg:text-lg"
            style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
          >
            Solicitar Cotización Personalizada
          </button>
        </div>
      </div>

      {/* Modal para detalles del servicio - Responsive */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6 lg:p-8">
          {selectedService && (
            <div className="space-y-4 md:space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mr-3 md:mr-4"
                    style={{ 
                      background: `linear-gradient(135deg, var(--brand-primary), var(--secondary-yellow))` 
                    }}
                  >
                    {React.createElement(iconMap[selectedService.icon], {
                      size: 20,
                      className: "md:w-6 md:h-6",
                      style: { color: 'var(--text-inverse)' }
                    })}
                  </div>
                  {t(`${selectedService.translationKey}.title`)}
                </DialogTitle>
                
                <DialogDescription className="text-base md:text-lg lg:text-xl leading-relaxed">
                  {t(`${selectedService.translationKey}.fullDescription`)}
                </DialogDescription>
              </DialogHeader>

              {/* Características responsive */}
              <div>
                <h4 className="font-semibold text-lg md:text-xl mb-4 flex items-center" style={{ color: 'var(--brand-primary)' }}>
                  <CheckCircle size={20} className="mr-2" />
                  {t('services.mainFeatures')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {t(`${selectedService.translationKey}.features`).map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-3 md:p-4 rounded-lg"
                      style={{ backgroundColor: 'rgba(217, 251, 6, 0.05)' }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'var(--brand-primary)' }}
                      >
                        <CheckCircle size={14} style={{ color: 'var(--text-inverse)' }} />
                      </div>
                      <span className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de Contacto responsive */}
              <div className="border-t pt-4 md:pt-6" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleContactClick}
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                    className="flex items-center text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    {t('services.cta')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://wa.me/5493884846695', '_blank')}
                    className="flex items-center text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};