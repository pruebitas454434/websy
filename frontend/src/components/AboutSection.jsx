import React from 'react';
import { Award, Users, Clock, Target } from 'lucide-react';
import { team, companyInfo } from '../mockData';

export const AboutSection = () => {
  return (
    <section id="nosotros" className="pad-120" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        {/* Company Overview */}
        <div className="text-center mb-16">
          <div className="caption mb-4" style={{ color: 'var(--brand-primary)' }}>
            Quiénes Somos
          </div>
          <h2 className="heading-1 mb-6">
            Expertos en
            <span style={{ color: 'var(--brand-primary)' }}> Desarrollo</span> de Software
          </h2>
          <p className="body-large max-w-4xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {companyInfo.description}
          </p>
        </div>

        {/* Stats & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Award size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="heading-3 mb-2" style={{ color: 'var(--brand-primary)' }}>50+</div>
            <div className="caption">Proyectos Completados</div>
          </div>
          
          <div className="text-center">
            <Users size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="heading-3 mb-2" style={{ color: 'var(--brand-primary)' }}>100%</div>
            <div className="caption">Clientes Satisfechos</div>
          </div>
          
          <div className="text-center">
            <Clock size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="heading-3 mb-2" style={{ color: 'var(--brand-primary)' }}>5+</div>
            <div className="caption">Años de Experiencia</div>
          </div>
          
          <div className="text-center">
            <Target size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="heading-3 mb-2" style={{ color: 'var(--brand-primary)' }}>24/7</div>
            <div className="caption">Soporte Técnico</div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="service-card">
            <h3 className="heading-3 mb-4" style={{ color: 'var(--brand-primary)' }}>Nuestra Misión</h3>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              {companyInfo.mission}
            </p>
          </div>
          
          <div className="service-card">
            <h3 className="heading-3 mb-4" style={{ color: 'var(--brand-primary)' }}>Nuestra Visión</h3>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              {companyInfo.vision}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h3 className="heading-2 mb-8">Nuestros Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.values.map((value, index) => (
              <div key={index} className="service-card text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-4" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                <h4 className="heading-3">{value}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h3 className="heading-2 mb-6">Nuestro Equipo</h3>
          <p className="body-large max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Contamos con un equipo de profesionales altamente capacitados y apasionados por la tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="service-card text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="heading-3 mb-2">{member.name}</h4>
              <div className="caption mb-3" style={{ color: 'var(--brand-primary)' }}>
                {member.position}
              </div>
              <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                {member.description}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {member.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'var(--border-medium)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};