import React from 'react';
import { Globe, Smartphone, ShoppingCart, Settings, Lightbulb, Wrench } from 'lucide-react';
import { services } from '../mockData';

const iconMap = {
  Globe,
  Smartphone,
  ShoppingCart,
  Settings,
  Lightbulb,
  Wrench
};

export const ServicesSection = () => {
  return (
    <section id="servicios" className="pad-120" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <div className="caption mb-4" style={{ color: 'var(--brand-primary)' }}>
            Nuestros Servicios
          </div>
          <h2 className="heading-1 mb-6">
            Soluciones Completas para tu
            <span style={{ color: 'var(--brand-primary)' }}> Negocio Digital</span>
          </h2>
          <p className="body-large max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Ofrecemos servicios integrales de desarrollo de software, desde aplicaciones web hasta 
            sistemas empresariales complejos, siempre con la más alta calidad y tecnologías modernas.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card fade-in-up">
                <div className="mb-6">
                  <IconComponent size={48} style={{ color: 'var(--brand-primary)' }} />
                </div>
                
                <h3 className="heading-3 mb-4">{service.title}</h3>
                
                <p className="body-small mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  <div className="caption mb-3" style={{ color: 'var(--brand-primary)' }}>
                    Características:
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="body-small flex items-center" style={{ color: 'var(--text-secondary)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Solicitar Información
          </button>
        </div>
      </div>
    </section>
  );
};