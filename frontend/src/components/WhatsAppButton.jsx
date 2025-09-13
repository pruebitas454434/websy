import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../mockData';

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de desarrollo de software. ¿Podrían darme más información?');
    const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-button"
      title="Contactar por WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};