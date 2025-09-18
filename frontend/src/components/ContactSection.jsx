import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { companyInfo } from '../mockData';
import { useLanguage } from '../LanguageContext';
import { saveCotizacion } from '../firebase';

export const ContactSection = () => {
  const { t } = useLanguage();
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
    // Minimal validation
    if (!formData.name || !formData.email || !formData.message || !formData.projectType) {
      alert(t('contact.validationMissing'));
      setIsSubmitting(false);
      return;
    }

    try {
      const docId = await saveCotizacion({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        projectType: formData.projectType,
        budget: formData.budget || null,
        message: formData.message
      });

      // Simple success UX
      alert(t('contact.thankYouMessage'));
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (err) {
      console.error('Error saving cotizacion:', err);
      alert(t('contact.submitError') + ' ' + (err.message || ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-12 md:py-16 lg:py-20 xl:py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Header Section - Responsive */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase tracking-wider" style={{ color: 'var(--brand-primary)' }}>
            {t('contact.title')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            {t('contact.subtitle')}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('contact.description')}
          </p>
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">{t('contact.requestQuote')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name and Email Row - Stack on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="text-sm font-semibold mb-2 md:mb-3 block" style={{ color: 'var(--text-primary)' }}>
                    {t('contact.formLabels.nameRequired')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-page)', 
                      borderColor: 'var(--border-medium)', 
                      color: 'var(--text-primary)'
                    }}
                    placeholder={t('contact.placeholders.fullName')}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="text-sm font-semibold mb-2 md:mb-3 block" style={{ color: 'var(--text-primary)' }}>
                    {t('contact.formLabels.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-page)', 
                      borderColor: 'var(--border-medium)', 
                      color: 'var(--text-primary)'
                    }}
                    placeholder={t('contact.placeholders.email')}
                    required
                  />
                </div>
              </div>

              {/* Company Field */}
              <div className="form-group">
                <label className="text-sm font-semibold mb-2 md:mb-3 block" style={{ color: 'var(--text-primary)' }}>
                  {t('contact.formLabels.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--bg-page)', 
                    borderColor: 'var(--border-medium)', 
                    color: 'var(--text-primary)'
                  }}
                  placeholder={t('contact.placeholders.companyName')}
                />
              </div>

              {/* Project Type and Budget Row - Stack on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="text-sm font-semibold mb-2 md:mb-3 block" style={{ color: 'var(--text-primary)' }}>
                    {t('contact.formLabels.projectType')}
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-page)', 
                      borderColor: 'var(--border-medium)', 
                      color: 'var(--text-primary)'
                    }}
                    required
                  >
                    <option value="">{t('contact.selectOptions.select')}</option>
                    <option value="web">{t('contact.selectOptions.webDev')}</option>
                    <option value="mobile">{t('contact.selectOptions.mobileApp')}</option>
                    <option value="ecommerce">{t('contact.selectOptions.ecommerce')}</option>
                    <option value="custom">{t('contact.selectOptions.customSystem')}</option>
                    <option value="consulting">{t('contact.selectOptions.consulting')}</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="text-sm font-semibold mb-2 md:mb-3 block" style={{ color: 'var(--text-primary)' }}>
                    {t('contact.formLabels.budget')}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-page)', 
                      borderColor: 'var(--border-medium)', 
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="">{t('contact.selectOptions.select')}</option>
                    <option value="120-500">{t('contact.budgetRanges.range1')}</option>
                    <option value="500-700">{t('contact.budgetRanges.range2')}</option>
                    <option value="700-1500">{t('contact.budgetRanges.range3')}</option>
                    <option value="1500-3000">{t('contact.budgetRanges.range4')}</option>
                    <option value="3000+">{t('contact.budgetRanges.range5')}</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label className="text-sm font-semibold mb-2 md:mb-3 block" style={{ color: 'var(--text-primary)' }}>
                  {t('contact.formLabels.projectDescription')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: 'var(--bg-page)', 
                    borderColor: 'var(--border-medium)', 
                    color: 'var(--text-primary)'
                  }}
                  rows="4"
                  placeholder={t('contact.placeholders.projectDetails')}
                  required
                ></textarea>
              </div>

              {/* Submit Button - Responsive */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
              >
                {isSubmitting ? t('contact.sending') : (
                  <>
                    <Send size={18} className="md:w-5 md:h-5 mr-2" />
                    {t('contact.sendRequest')}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">{t('contact.contactInfo')}</h3>
            
            {/* Contact Details - Responsive spacing */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              <div className="flex items-start space-x-3 md:space-x-4">
                <MapPin size={20} className="md:w-6 md:h-6 mt-1 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">{t('contact.location')}</h4>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {companyInfo.location}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4">
                <Phone size={20} className="md:w-6 md:h-6 mt-1 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">{t('contact.phone')}</h4>
                  <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                    {companyInfo.phone}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4">
                <Mail size={20} className="md:w-6 md:h-6 mt-1 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">Email</h4>
                  <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                    {companyInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info Card - Responsive */}
            <div className="p-4 md:p-6 rounded-lg md:rounded-xl" style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-medium)' }}>
              <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: 'var(--brand-primary)' }}>
                {t('contact.whyChooseUs')}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li className="text-sm md:text-base flex items-start leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  {t('contact.freeConsultation')}
                </li>
                <li className="text-sm md:text-base flex items-start leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  {t('contact.detailedQuote24h')}
                </li>
                <li className="text-sm md:text-base flex items-start leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  {t('contact.agileMethodology')}
                </li>
                <li className="text-sm md:text-base flex items-start leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}></div>
                  {t('contact.postLaunchSupport')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};