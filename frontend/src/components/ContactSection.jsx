import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { companyInfo } from '../mockData';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      alert('¡Gracias por tu consulta! Te contactaremos pronto.');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="pad-120" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <div className="caption mb-4" style={{ color: 'var(--brand-primary)' }}>
            Contacto
          </div>
          <h2 className="heading-1 mb-6">
            ¿Listo para
            <span style={{ color: 'var(--brand-primary)' }}> Comenzar</span>?
          </h2>
          <p className="body-large max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Cuéntanos sobre tu proyecto y te ayudaremos a convertir tus ideas en realidad. 
            Solicita una cotización gratuita y sin compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="heading-3 mb-6">Solicitar Cotización</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="caption block mb-2" style={{ color: 'var(--text-primary)' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="caption block mb-2" style={{ color: 'var(--text-primary)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="caption block mb-2" style={{ color: 'var(--text-primary)' }}>
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="caption block mb-2" style={{ color: 'var(--text-primary)' }}>
                    Tipo de Proyecto *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="web">Desarrollo Web</option>
                    <option value="mobile">App Móvil</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="custom">Sistema Personalizado</option>
                    <option value="consulting">Consultoría</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="caption block mb-2" style={{ color: 'var(--text-primary)' }}>
                    Presupuesto Estimado
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Seleccionar</option>
                    <option value="<10k">Menos de $10.000 USD</option>
                    <option value="10k-25k">$10.000 - $25.000 USD</option>
                    <option value="25k-50k">$25.000 - $50.000 USD</option>
                    <option value="50k+">Más de $50.000 USD</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="caption block mb-2" style={{ color: 'var(--text-primary)' }}>
                  Descripción del Proyecto *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  rows="5"
                  placeholder="Cuéntanos más detalles sobre tu proyecto, funcionalidades requeridas, plazos, etc."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? 'Enviando...' : (
                  <>
                    <Send size={20} className="mr-2" />
                    Enviar Solicitud
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="heading-3 mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin size={24} style={{ color: 'var(--brand-primary)' }} className="mt-1" />
                <div>
                  <h4 className="body-medium mb-1">Ubicación</h4>
                  <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                    {companyInfo.location}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone size={24} style={{ color: 'var(--brand-primary)' }} className="mt-1" />
                <div>
                  <h4 className="body-medium mb-1">Teléfono</h4>
                  <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                    {companyInfo.phone}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail size={24} style={{ color: 'var(--brand-primary)' }} className="mt-1" />
                <div>
                  <h4 className="body-medium mb-1">Email</h4>
                  <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                    {companyInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-medium)' }}>
              <h4 className="heading-3 mb-4" style={{ color: 'var(--brand-primary)' }}>
                ¿Por qué elegirnos?
              </h4>
              <ul className="space-y-3">
                <li className="body-small flex items-center" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  Consulta inicial gratuita
                </li>
                <li className="body-small flex items-center" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  Cotización detallada en 24 horas
                </li>
                <li className="body-small flex items-center" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  Metodología ágil y transparente
                </li>
                <li className="body-small flex items-center" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  Soporte post-lanzamiento incluido
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};