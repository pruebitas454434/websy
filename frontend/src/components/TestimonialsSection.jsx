import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, X, MessageSquarePlus } from 'lucide-react';
import { subscribeComentarios, saveComentario } from '../firebase';
import { useLanguage } from '../LanguageContext';

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    company: '',
    position: '',
    text: '',
    rating: 5
  });
  const [comentarios, setComentarios] = useState([]);
  const { t } = useLanguage();

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, comentarios.length));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Subscribe to comentarios collection
  useEffect(() => {
    const unsub = subscribeComentarios((docs) => {
      setComentarios(docs);
      // reset index if out of bounds
      setCurrentIndex((i) => Math.min(i, Math.max(0, docs.length - 1)));
    });
    return () => unsub && unsub();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, comentarios.length));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, comentarios.length)) % Math.max(1, comentarios.length));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.text) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    try {
      await saveComentario({
        name: newTestimonial.name,
        company: newTestimonial.company || null,
        position: newTestimonial.position || null,
        text: newTestimonial.text,
        rating: newTestimonial.rating
      });
      setShowModal(false);
      setNewTestimonial({ name: '', company: '', position: '', text: '', rating: 5 });
      alert('¡Gracias por tu testimonio! Se publicará en breve.');
    } catch (err) {
      console.error('Error saving comentario:', err);
      alert('Error al enviar testimonio: ' + (err.message || ''));
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={interactive ? 20 : 16}
        className={`${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        } transition-colors duration-200 ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
        onClick={interactive ? () => onStarClick(i + 1) : undefined}
      />
    ));
  };

  const formatDate = (ts) => {
    try {
      let date;
      if (!ts) return '';
      // Firestore timestamps have toDate()
      if (typeof ts.toDate === 'function') date = ts.toDate();
      else date = new Date(ts);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    } catch (e) {
      return '';
    }
  };

  return (
    <section id="testimonios" className="py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-l from-yellow-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-sm md:text-base font-semibold mb-3 md:mb-4 tracking-wider uppercase" style={{ color: 'var(--brand-primary)' }}>Testimonios</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Lo que dicen nuestros <span style={{ color: 'var(--brand-primary)' }}>clientes</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            La satisfacción de nuestros clientes es nuestra mayor recompensa. Conoce las experiencias de quienes han confiado en Websy.
          </p>

          {/* Centered CTA */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
            >
              <MessageSquarePlus size={18} className="md:w-5 md:h-5" />
              Dejar tu testimonio
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl md:rounded-3xl">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {comentarios.length === 0 ? (
                <div className="w-full px-2 md:px-4">
                  <div className="p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/3 border border-white/10 text-center">
                    <p style={{ color: 'var(--text-secondary)' }}>Aún no hay testimonios. Sé el primero en dejar el tuyo.</p>
                  </div>
                </div>
              ) : (
                comentarios.map((testimonial, index) => (
                  <div key={testimonial.id || index} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/6 to-white/3 rounded-xl md:rounded-2xl border border-white/12 shadow-lg overflow-hidden mx-auto max-w-4xl">
                      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-400" />
                      <div className="p-6 md:p-8 lg:p-10">
                        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                          <div className="flex-shrink-0 flex items-start">
                            {testimonial.image ? (
                              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg ring-2 ring-white" />
                            ) : (
                              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                {testimonial.name ? testimonial.name.split(' ').map(n => n[0]).slice(0,2).join('') : 'WS'}
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-lg md:text-xl font-semibold text-white">{testimonial.name}</h4>
                                <div className="text-sm text-white/80">{testimonial.position}{testimonial.company ? ` · ${testimonial.company}` : ''}</div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="text-sm text-white/60">{formatDate(testimonial.createdAt)}</div>
                                  <div className="flex items-center">{renderStars(testimonial.rating)}</div>
                                </div>
                              </div>
                            </div>

                            <div className="relative">
                              <Quote size={36} className="absolute -top-4 -left-4 opacity-10 w-9 h-9" style={{ color: 'var(--brand-primary)' }} />
                              <blockquote className="text-base md:text-lg lg:text-xl leading-relaxed font-medium relative z-10 text-white">{testimonial.text}</blockquote>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Nav buttons */}
          <button onClick={prevTestimonial} className="hidden sm:flex absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/30">
            <ChevronLeft size={20} className="md:w-6 md:h-6" style={{ color: 'white' }} />
          </button>
          <button onClick={nextTestimonial} className="hidden sm:flex absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/30">
            <ChevronRight size={20} className="md:w-6 md:h-6" style={{ color: 'white' }} />
          </button>

          {/* Mobile nav */}
          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <button onClick={prevTestimonial} className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/30"><ChevronLeft size={20} style={{ color: 'white' }} /></button>
            <button onClick={nextTestimonial} className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/30"><ChevronRight size={20} style={{ color: 'white' }} /></button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {comentarios.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-8 md:w-12 h-3 md:h-4' : 'w-3 md:w-4 h-3 md:h-4 hover:scale-125'}`} style={{ backgroundColor: index === currentIndex ? 'var(--brand-primary)' : 'var(--border-medium)' }} />
            ))}
          </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ backgroundColor: 'var(--brand-primary)' }} />
              <div className="relative backdrop-blur-xl rounded-2xl max-h-[90vh] overflow-hidden border shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-light)' }}>
                <div className="p-4 md:p-8 pb-4 md:pb-6 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2" style={{ color: 'var(--text-primary)' }}>Comparte tu experiencia</h3>
                      <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>Tu testimonio nos ayuda a seguir mejorando</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-2 rounded-full transition-all duration-200 hover:scale-110" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}><X size={20} /></button>
                  </div>
                </div>

                <div className="p-4 md:p-8 max-h-[60vh] overflow-y-auto">
                  <form onSubmit={handleSubmitTestimonial} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 md:mb-3" style={{ color: 'var(--text-primary)' }}>Nombre completo *</label>
                        <input type="text" required value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl transition-all duration-200 focus:ring-2 focus:border-transparent text-sm md:text-base" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-medium)', color: 'var(--text-primary)', focusRingColor: 'var(--brand-primary)' }} placeholder="Tu nombre completo" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 md:mb-3" style={{ color: 'var(--text-primary)' }}>Empresa</label>
                        <input type="text" value={newTestimonial.company} onChange={(e) => setNewTestimonial({...newTestimonial, company: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl transition-all duration-200 focus:ring-2 focus:border-transparent text-sm md:text-base" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-medium)', color: 'var(--text-primary)', focusRingColor: 'var(--brand-primary)' }} placeholder="Nombre de tu empresa" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 md:mb-3" style={{ color: 'var(--text-primary)' }}>Cargo/Posición</label>
                      <input type="text" value={newTestimonial.position} onChange={(e) => setNewTestimonial({...newTestimonial, position: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl transition-all duration-200 focus:ring-2 focus:border-transparent text-sm md:text-base" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-medium)', color: 'var(--text-primary)', focusRingColor: 'var(--brand-primary)' }} placeholder="Tu cargo o posición" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 md:mb-3" style={{ color: 'var(--text-primary)' }}>Calificación *</label>
                      <div className="flex items-center gap-3 p-3 md:p-4 border rounded-lg md:rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-light)' }}>
                        <div className="flex gap-1">{renderStars(newTestimonial.rating, true, (rating) => setNewTestimonial({...newTestimonial, rating}))}</div>
                        <span className="font-medium text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>{newTestimonial.rating} de 5 estrellas</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 md:mb-3" style={{ color: 'var(--text-primary)' }}>Tu testimonio *</label>
                      <textarea required value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl h-24 md:h-32 resize-none transition-all duration-200 focus:ring-2 focus:border-transparent text-sm md:text-base" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-medium)', color: 'var(--text-primary)', focusRingColor: 'var(--brand-primary)' }} placeholder="Comparte tu experiencia trabajando con Websy..." />
                    </div>

                    <div className="flex gap-3 md:gap-4 pt-3 md:pt-4">
                      <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 md:px-6 py-2 md:py-3 border rounded-lg md:rounded-xl font-semibold transition-all duration-200 hover:scale-105 text-sm md:text-base" style={{ borderColor: 'var(--border-medium)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-subtle)' }}>Cancelar</button>
                      <button type="submit" className="flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base" style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}>Enviar testimonio</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};