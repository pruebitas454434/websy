import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../mockData';

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleWhatsAppClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de desarrollo de software. ¿Podrían darme más información?');
    const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Enhanced Tooltip */}
      <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-2xl whitespace-nowrap text-sm font-medium relative border border-gray-200">
          ¿Necesitas ayuda? ¡Hablemos!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </div>

      {/* Enhanced WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group relative w-14 h-14 bg-green-500 hover:bg-green-600 
          rounded-full flex items-center justify-center 
          transition-all duration-300 cursor-pointer
          hover:scale-110 active:scale-95
          shadow-lg hover:shadow-2xl hover:shadow-green-500/30
          ${isPressed ? 'scale-90' : ''}
          ${isHovered ? 'animate-pulse' : ''}
        `}
        title="Contactar por WhatsApp"
        aria-label="Contactar por WhatsApp"
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-150"></div>
        
        {/* Floating Animation Ring */}
        <div className={`absolute inset-0 rounded-full border-2 border-green-300 transition-all duration-1000 ${
          isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}></div>

        {/* Icon */}
        <MessageCircle 
          size={24} 
          className="text-white relative z-10 transition-transform duration-200 group-hover:scale-110" 
        />

        {/* Notification Dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        </div>
      </button>

      {/* Floating Animation Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 rounded-full border border-green-300/50 transition-all duration-2000 ${
          isHovered ? 'scale-200 opacity-0' : 'scale-100 opacity-100'
        }`}></div>
        <div className={`absolute inset-0 rounded-full border border-green-300/30 transition-all duration-2000 ${
          isHovered ? 'scale-250 opacity-0' : 'scale-110 opacity-100'
        }`} style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};