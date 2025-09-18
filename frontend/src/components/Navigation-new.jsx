import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '#inicio' },
    { name: t('nav.services'), href: '#servicios' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.about'), href: '#nosotros' },
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
    <nav className="fixed top-0 w-full bg-opacity-95 backdrop-blur-sm z-50" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">
            <span style={{ color: 'var(--brand-primary)' }}>Websy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="nav-link"
              >
                {item.name}
              </button>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 nav-link"
                style={{ color: 'var(--text-primary)' }}
              >
                <Globe size={18} />
                <span>{currentLangObj.flag}</span>
                <ChevronDown size={14} />
              </button>
              
              {isLanguageOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 py-2 w-48 rounded-lg shadow-lg border z-50"
                  style={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border-medium)' 
                  }}
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className="w-full px-4 py-2 text-left hover:opacity-80 transition-opacity flex items-center space-x-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'var(--text-primary)' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--border-medium)' }}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left nav-link py-2"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-medium)' }}>
              <div className="mb-2 px-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Idioma
                </span>
              </div>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`block w-full text-left nav-link py-2 flex items-center space-x-3 ${
                    currentLanguage === language.code ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};