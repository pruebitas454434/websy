import React from 'react';
import { Award, Users, Clock, Target } from 'lucide-react';
import { team } from '../mockData';
import { useLanguage } from '../LanguageContext';

export const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="nosotros" className="py-12 md:py-16 lg:py-20 xl:py-24" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Company Overview */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase tracking-wider" style={{ color: 'var(--brand-primary)' }}>
            {t('about.whoWeAre')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span style={{ color: 'var(--brand-primary)' }}>{t('about.subtitle')}</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('about.description')}
          </p>
        </div>

        {/* Stats & Values - Responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16 lg:mb-20">
          <div className="text-center p-4 md:p-6">
            <Award size={32} className="md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: 'var(--brand-primary)' }}>4+</div>
            <div className="text-xs md:text-sm lg:text-base uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('about.stats.projects')}</div>
          </div>
          
          <div className="text-center p-4 md:p-6">
            <Users size={32} className="md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: 'var(--brand-primary)' }}>100%</div>
            <div className="text-xs md:text-sm lg:text-base uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('about.stats.clients')}</div>
          </div>
          
          <div className="text-center p-4 md:p-6">
            <Clock size={32} className="md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: 'var(--brand-primary)' }}>1+</div>
            <div className="text-xs md:text-sm lg:text-base uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('about.stats.experience')}</div>
          </div>
          
          <div className="text-center p-4 md:p-6">
            <Target size={32} className="md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4" style={{ color: 'var(--brand-primary)' }} />
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: 'var(--brand-primary)' }}>24/7</div>
            <div className="text-xs md:text-sm lg:text-base uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{t('about.stats.support')}</div>
          </div>
        </div>

        {/* Mission & Vision - Responsive cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-300 hover:border-yellow-400 hover:shadow-xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6" style={{ color: 'var(--brand-primary)' }}>🌍 {t('about.ourMission')}</h3>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('about.missionText')}
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-300 hover:border-yellow-400 hover:shadow-xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6" style={{ color: 'var(--brand-primary)' }}>👁️ {t('about.ourVision')}</h3>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('about.visionText')}
            </p>
          </div>
        </div>

        {/* Values - Responsive layout */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-8 lg:mb-12">💡 {t('about.ourValues')}</h3>
          <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-4xl mx-auto">
            {t('about.valuesText').map((value, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-2xl p-4 md:p-6 lg:p-8 text-left transition-all duration-300 hover:border-yellow-400 hover:shadow-lg">
                <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <strong className="text-yellow-400">{value.split(':')[0]}:</strong>
                  <span className="ml-2">{value.split(':')[1] || value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team - Responsive section */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6">{t('about.ourTeam')}</h3>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('about.teamDescription')}
          </p>
        </div>

        {/* Team cards - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-yellow-400 hover:shadow-xl hover:transform hover:scale-105">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-4 md:mb-6 object-cover border-2 border-yellow-400"
              />
              <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-white">{member.name}</h4>
              <div className="text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase tracking-wide" style={{ color: 'var(--brand-primary)' }}>
                {member.position}
              </div>
              <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {member.description}
              </p>
              
              {/* Skills - Responsive tags */}
              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                {member.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs md:text-sm rounded-full transition-colors hover:bg-yellow-400 hover:text-gray-900"
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