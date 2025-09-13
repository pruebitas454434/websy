import React from 'react';
import { ArrowRight, Code, Smartphone, Globe } from 'lucide-react';

export const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="caption" style={{ color: 'var(--brand-primary)' }}>
                Agencia de Desarrollo de Software
              </div>
              <h1 className="brand-display">
                Transformamos tus
                <span style={{ color: 'var(--brand-primary)' }}> ideas</span> en
                <span style={{ color: 'var(--brand-primary)' }}> soluciones</span> digitales
              </h1>
              <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                Desarrollamos aplicaciones web, móviles y sistemas personalizados 
                para empresas en Argentina que buscan innovar y crecer en el mundo digital.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToContact} className="btn-primary">
                Solicitar Cotización
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button 
                onClick={() => document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Ver Portfolio
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t" style={{ borderColor: 'var(--border-medium)' }}>
              <div>
                <div className="heading-3" style={{ color: 'var(--brand-primary)' }}>50+</div>
                <div className="caption">Proyectos Completados</div>
              </div>
              <div>
                <div className="heading-3" style={{ color: 'var(--brand-primary)' }}>5+</div>
                <div className="caption">Años de Experiencia</div>
              </div>
              <div>
                <div className="heading-3" style={{ color: 'var(--brand-primary)' }}>100%</div>
                <div className="caption">Clientes Satisfechos</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Service Icons */}
              <div className="service-card text-center">
                <Globe size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
                <h3 className="heading-3 mb-2">Web Apps</h3>
                <p className="body-small">Aplicaciones web modernas y escalables</p>
              </div>
              
              <div className="service-card text-center">
                <Smartphone size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
                <h3 className="heading-3 mb-2">Apps Móviles</h3>
                <p className="body-small">iOS y Android nativas y multiplataforma</p>
              </div>
              
              <div className="service-card text-center col-span-2">
                <Code size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
                <h3 className="heading-3 mb-2">Sistemas Personalizados</h3>
                <p className="body-small">Soluciones a medida para tu negocio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};