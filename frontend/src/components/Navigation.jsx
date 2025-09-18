import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();

  // Section IDs for scroll spy
  const sectionIds = ['inicio', 'servicios', 'portfolio', 'nosotros', 'testimonios', 'contacto'];
  const activeSection = useScrollSpy(sectionIds);

  const navItems = [
    { name: t('nav.home'), href: '#inicio' },
    { name: t('nav.services'), href: '#servicios' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.about'), href: '#nosotros' },
    { name: 'Testimonios', href: '#testimonios' },
    { name: t('nav.contact'), href: '#contacto' }
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const currentLangObj = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language.code);
    setIsLanguageOpen(false);
    console.log(`Cambiando idioma a: ${language.name}`);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-opacity-95 backdrop-blur-sm z-50 border-b border-opacity-20" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-light)' }}>
      <div className="container">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center">
            <img 
              src="/websy-logo.png" 
              alt="Websy Logo" 
              className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-3"
            />
            <span className="text-lg md:text-xl font-bold" style={{ color: 'white' }}>
              Websy
            </span>
          </div>

          {/* Desktop Navigation - Hidden on mobile and tablets */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative group text-white hover:text-opacity-80 transition-all duration-300 font-medium text-sm xl:text-base px-3 py-2 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-lime-500/25 hover:bg-white/10 ${
                    isActive ? 'text-lime-400 bg-white/10' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lime-400 to-yellow-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              );
            })}
            
            {/* Enhanced Desktop Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 text-white hover:text-opacity-80 transition-all duration-300 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <Globe size={16} className="hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm">{currentLangObj.flag}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 py-2 w-48 rounded-xl shadow-2xl border backdrop-blur-md z-50 slide-in-up"
                  style={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border-medium)' 
                  }}
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center space-x-3 hover:scale-105 ${
                        currentLanguage === language.code 
                          ? 'bg-white/10 text-lime-400' 
                          : 'text-white hover:bg-white/5 hover:text-lime-300'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-lime-400"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg border border-white/20 hover:border-white/40 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'var(--text-primary)' }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile/Tablet Navigation - Full screen overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-16 md:top-18 z-40">
            {/* Background overlay */}
            <div 
              className="absolute inset-0 backdrop-blur-md"
              style={{ backgroundColor: 'rgba(24, 42, 44, 0.95)' }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu content */}
            <div className="relative h-full overflow-y-auto">
              <div className="container py-6">
                {/* Navigation items */}
                <div className="space-y-1 mb-8">
                  {navItems.map((item, index) => {
                    const sectionId = item.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className={`block w-full text-left px-4 py-4 text-lg md:text-xl font-medium text-white hover:bg-white/10 transition-all duration-300 rounded-xl ${
                          isActive ? 'bg-white/10 text-lime-400 border-l-4 border-lime-400' : 'hover:border-l-4 hover:border-lime-400/50'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
                
                {/* Mobile Language Selector */}
                <div className="border-t pt-6" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="mb-4 px-4">
                    <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                      Seleccionar Idioma
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map((language, index) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className={`p-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 ${
                          currentLanguage === language.code 
                            ? 'border-white/40 bg-white/10' 
                            : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                        }`}
                        style={{ animationDelay: `${(navItems.length + index) * 0.1}s` }}
                      >
                        <span className="text-xl">{language.flag}</span>
                        <span className="font-medium text-white text-sm">{language.name}</span>
                        {currentLanguage === language.code && (
                          <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};