import React from 'react';
import { ArrowRight, Code, Smartphone, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero-section relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-green-500/20 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-l from-blue-500/15 to-purple-600/15 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-lime-500/5 to-transparent"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div 
                className="text-sm md:text-base font-semibold uppercase tracking-wider fade-in-down inline-block px-4 py-2 rounded-full border border-lime-400/30 bg-lime-400/10"
                style={{ 
                  color: 'var(--brand-primary)'
                }}
              >
                {t('hero.title')}
              </div>
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight fade-in-up"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('hero.subtitle')}
              </h1>
              <p 
                className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed fade-in-up" 
                style={{ 
                  color: 'var(--text-secondary)',
                  animationDelay: '0.2s'
                }}
              >
                {t('hero.description')}
              </p>
            </div>

            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <button 
                onClick={scrollToContact} 
                className="group btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover:shadow-2xl hover:shadow-lime-500/25 transform hover:scale-105 transition-all duration-300"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
              </button>
              <button 
                onClick={() => document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="group btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                {t('hero.viewPortfolio')}
              </button>
            </div>

            {/* Enhanced Stats */}
            <div 
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-8 border-t max-w-md mx-auto lg:mx-0 lg:max-w-none fade-in-up" 
              style={{ borderColor: 'var(--border-medium)', animationDelay: '0.6s' }}
            >
              <div className="text-center lg:text-left hover:scale-110 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold glow" style={{ color: 'var(--brand-primary)' }}>5+</div>
                <div className="text-xs sm:text-sm uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('hero.stats.projects')}</div>
              </div>
              <div className="text-center lg:text-left hover:scale-110 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold glow" style={{ color: 'var(--brand-primary)', animationDelay: '0.5s' }}>1+</div>
                <div className="text-xs sm:text-sm uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('hero.stats.experience')}</div>
              </div>
              <div className="text-center lg:text-left hover:scale-110 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold glow" style={{ color: 'var(--brand-primary)', animationDelay: '1s' }}>100%</div>
                <div className="text-xs sm:text-sm uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('hero.stats.clients')}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Visual Elements */}
          <div className="relative hidden md:block order-first lg:order-last fade-in-right">
            <div className="grid grid-cols-1 gap-4 max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:ml-auto lg:mr-0">
              {/* Service Cards with Enhanced Effects */}
              <div 
                className="relative overflow-hidden rounded-2xl h-40 md:h-48 lg:h-56 group cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/20 scale-in"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  animationDelay: '0.8s'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-left">
                  <div className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--brand-primary)' }}>
                    <Globe size={16} className="md:w-5 md:h-5" style={{ color: 'var(--text-inverse)' }} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-lime-400 transition-colors duration-300">{t('hero.cards.webDev')}</h3>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors duration-300">{t('hero.cards.webDevDesc')}</p>
                </div>
              </div>
              
              <div 
                className="relative overflow-hidden rounded-2xl h-40 md:h-48 lg:h-56 group cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 scale-in"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  animationDelay: '1s'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-left">
                  <div className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--brand-primary)' }}>
                    <Code size={16} className="md:w-5 md:h-5" style={{ color: 'var(--text-inverse)' }} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-lime-400 transition-colors duration-300">{t('hero.cards.customSoft')}</h3>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors duration-300">{t('hero.cards.customSoftDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};