import React from 'react';
import { ExternalLink, Calendar, Users } from 'lucide-react';
import { portfolio } from '../mockData';
import { useLanguage } from '../LanguageContext';
import { AnimatedSection } from './AnimatedSection';

export const PortfolioSection = () => {
  const { t } = useLanguage();
  return (
    <section id="portfolio" className="py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-l from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container px-4 md:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase tracking-wider" style={{ color: 'var(--brand-primary)' }}>
            {t('portfolio.title')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            {t('portfolio.subtitle')}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('portfolio.description')}
          </p>
        </AnimatedSection>

        {/* Proyectos en Grid Responsive - 1 col mobile, 2 cols tablet, 3-4 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto mb-12 md:mb-16 lg:mb-20">
          {portfolio.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:shadow-2xl hover:transform hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    className="px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base transform translate-y-4 group-hover:translate-y-0"
                    style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
                    onClick={() => window.open(project.url, '_blank')}
                  >
                    <ExternalLink size={16} className="md:w-5 md:h-5 mr-2" />
                    {t('portfolio.viewProject')}
                  </button>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--brand-primary)' }}>
                    {project.category}
                  </span>
                  <div className="flex items-center text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Calendar size={14} className="md:w-4 md:h-4 mr-1" />
                    {project.year}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-white line-clamp-2">{project.title}</h3>
                
                <p className="text-sm md:text-base mb-3 md:mb-4 leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                
                <div className="flex items-center mb-3 md:mb-4" style={{ color: 'var(--text-secondary)' }}>
                  <Users size={14} className="md:w-4 md:h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm md:text-base truncate">{project.client}</span>
                </div>
                
                {/* Technologies - Responsive layout */}
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs md:text-sm rounded-full transition-colors hover:bg-yellow-400 hover:text-gray-900"
                      style={{ 
                        backgroundColor: 'var(--border-medium)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span 
                      className="px-2 py-1 text-xs md:text-sm rounded-full"
                      style={{ 
                        backgroundColor: 'var(--border-medium)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action responsive */}
        <div className="text-center">
          <button 
            onClick={() => document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base lg:text-lg"
            style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
          >
            {t('portfolio.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};