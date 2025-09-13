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
    <footer className="pad-80" style={{ backgroundColor: 'var(--bg-page)', borderTop: '1px solid var(--border-medium)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span style={{ color: 'var(--brand-primary)' }}>Tech</span>
              <span style={{ color: 'var(--text-primary)' }}>Solutions</span>
            </div>
            <p className="body-small mb-6" style={{ color: 'var(--text-secondary)' }}>
              {companyInfo.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-brand-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary hover:text-brand-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-brand-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="heading-3 mb-4">Servicios</h4>
            <ul className="space-y-2">
              {['Desarrollo Web', 'Apps Móviles', 'E-commerce', 'Sistemas Personalizados', 'Consultoría Tech'].map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection('#servicios')}
                    className="body-small hover:text-brand-primary transition-colors text-left"
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
            <h4 className="heading-3 mb-4">Empresa</h4>
            <ul className="space-y-2">
              {[
                { name: 'Nosotros', href: '#nosotros' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Contacto', href: '#contacto' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => scrollToSection(item.href)}
                    className="body-small hover:text-brand-primary transition-colors text-left"
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
            <h4 className="heading-3 mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} style={{ color: 'var(--brand-primary)' }} className="mt-1" />
                <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  {companyInfo.location}
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone size={16} style={{ color: 'var(--brand-primary)' }} className="mt-1" />
                <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  {companyInfo.phone}
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={16} style={{ color: 'var(--brand-primary)' }} className="mt-1" />
                <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  {companyInfo.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--border-medium)' }}>
          <p className="body-small mb-4 md:mb-0" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} TechSolutions Argentina. Todos los derechos reservados.
          </p>
          
          <div className="flex space-x-6">
            <button className="body-small hover:text-brand-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Política de Privacidad
            </button>
            <button className="body-small hover:text-brand-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Términos de Servicio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};