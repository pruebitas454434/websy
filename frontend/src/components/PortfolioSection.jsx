import React, { useState } from 'react';
import { ExternalLink, Calendar, Users } from 'lucide-react';
import { portfolio } from '../mockData';

export const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', ...new Set(portfolio.map(project => project.category))];
  
  const filteredProjects = selectedCategory === 'Todos' 
    ? portfolio 
    : portfolio.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="pad-120" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <div className="caption mb-4" style={{ color: 'var(--brand-primary)' }}>
            Nuestro Portfolio
          </div>
          <h2 className="heading-1 mb-6">
            Proyectos que nos
            <span style={{ color: 'var(--brand-primary)' }}> Enorgullecen</span>
          </h2>
          <p className="body-large max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Hemos trabajado con empresas de diversos sectores, creando soluciones digitales 
            que transforman negocios y generan resultados excepcionales.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'btn-primary' : 'btn-secondary'}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card fade-in-up">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="btn-primary">
                    <ExternalLink size={20} className="mr-2" />
                    Ver Proyecto
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="caption" style={{ color: 'var(--brand-primary)' }}>
                    {project.category}
                  </span>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Calendar size={16} className="mr-1" />
                    {project.year}
                  </div>
                </div>
                
                <h3 className="heading-3 mb-3">{project.title}</h3>
                
                <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                
                <div className="flex items-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                  <Users size={16} className="mr-2" />
                  <span className="body-small">{project.client}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: 'var(--border-medium)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Solicitar Cotización
          </button>
        </div>
      </div>
    </section>
  );
};