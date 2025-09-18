import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import { companyInfo } from '../mockData';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'var(--bg-page)', borderTop: '1px solid var(--border-medium)' }}>
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Main Footer Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              <span style={{ color: 'var(--brand-primary)' }}>Websy</span>
            </div>
            <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {companyInfo.tagline}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-subtle)' }}
              >
                <Linkedin size={18} className="md:w-5 md:h-5" style={{ color: 'var(--text-primary)' }} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-subtle)' }}
              >
                <Twitter size={18} className="md:w-5 md:h-5" style={{ color: 'var(--text-primary)' }} />
              </a>
              <a 
                href={companyInfo.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-subtle)' }}
              >
                <Instagram size={18} className="md:w-5 md:h-5" style={{ color: 'var(--text-primary)' }} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>
              Servicios
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {['Desarrollo Web', 'Apps Móviles', 'E-commerce', 'Sistemas Personalizados', 'Consultoría Tech'].map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection('#servicios')}
                    className="text-sm md:text-base hover:text-brand-primary transition-colors text-left leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>
              Empresa
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: 'Nosotros', href: '#nosotros' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Testimonios', href: '#testimonios' },
                { name: 'Contacto', href: '#contacto' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm md:text-base hover:text-brand-primary transition-colors text-left leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>
              Contacto
            </h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="md:w-5 md:h-5 mt-1 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                <span className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {companyInfo.location}
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone size={16} className="md:w-5 md:h-5 mt-1 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="text-sm md:text-base hover:text-brand-primary transition-colors leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {companyInfo.phone}
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={16} className="md:w-5 md:h-5 mt-1 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm md:text-base hover:text-brand-primary transition-colors leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Responsive */}
        <div className="pt-6 md:pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--border-medium)' }}>
          <p className="text-sm md:text-base text-center sm:text-left" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} Websy. Todos los derechos reservados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button 
              className="text-sm md:text-base hover:text-brand-primary transition-colors whitespace-nowrap" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Política de Privacidad
            </button>
            <button 
              className="text-sm md:text-base hover:text-brand-primary transition-colors whitespace-nowrap" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Términos de Servicio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};