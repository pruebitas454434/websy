import React, { useState } from 'react';
import { MessageSquare, Send, Star } from 'lucide-react';
import { saveComentario } from '../firebase';

const CommentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5,
    page: 'General'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.comment) {
      alert('Por favor completa todos los campos requeridos');
      setIsSubmitting(false);
      return;
    }

    try {
      await saveComentario({
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        rating: formData.rating,
        page: formData.page,
        status: 'pendiente' // Todos los comentarios nuevos empiezan como pendientes
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        comment: '',
        rating: 5,
        page: 'General'
      });
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      alert('Error al enviar el comentario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-2xl mb-2">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">¡Comentario enviado!</h3>
        <p className="text-green-700">
          Gracias por tu comentario. Será revisado por nuestro equipo antes de ser publicado.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Enviar otro comentario
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <MessageSquare className="text-blue-600 mr-3" size={24} />
        <h3 className="text-xl font-semibold text-gray-900">Deja tu comentario</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Página
          </label>
          <select
            name="page"
            value={formData.page}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="General">General</option>
            <option value="Inicio">Inicio</option>
            <option value="Servicios">Servicios</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Contacto">Contacto</option>
            <option value="Acerca de">Acerca de</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calificación
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`p-1 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star size={20} fill={star <= formData.rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentario *
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Comparte tu experiencia con nosotros..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Enviar Comentario
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4">
        * Campos requeridos. Tu comentario será revisado antes de ser publicado.
      </p>
    </div>
  );
};

export default CommentForm;