import React, { useState } from 'react';
import {
  X,
  Home,
  Users,
  FileText,
  Settings,
  BarChart3,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Eye,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Check,
  X as XIcon
} from 'lucide-react';
import useComentarios from '../hooks/useComentarios';

const AdminPanel = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingComment, setEditingComment] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', comment: '' });

  const {
    comentarios,
    loading: loadingComentarios,
    error: errorComentarios,
    editarComentario,
    eliminarComentario,
    cambiarEstadoComentario
  } = useComentarios();

  // Usar comentarios de Firebase si existen, sino usar datos mock
  const comentariosToShow = comentarios.length > 0 ? comentarios : [
    { id: 1, name: 'María García', email: 'maria@email.com', comment: 'Excelente servicio, muy profesionales', page: 'Servicios', createdAt: new Date('2025-09-18'), status: 'aprobado' },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', comment: 'Me gustaría más información sobre precios', page: 'Contacto', createdAt: new Date('2025-09-17'), status: 'pendiente' },
    { id: 3, name: 'Ana Rodríguez', email: 'ana@email.com', comment: 'Gran trabajo en el diseño web', page: 'Portfolio', createdAt: new Date('2025-09-16'), status: 'aprobado' },
    { id: 4, name: 'Pedro Sánchez', email: 'pedro@email.com', comment: 'Comentario spam', page: 'Inicio', createdAt: new Date('2025-09-15'), status: 'rechazado' },
    { id: 5, name: 'Laura Martínez', email: 'laura@email.com', comment: '¿Ofrecen mantenimiento mensual?', page: 'Servicios', createdAt: new Date('2025-09-14'), status: 'pendiente' }
  ];
  const stats = {
    visitors: 1234,
    pages: 56,
    users: 89,
    revenue: 4567
  };

  // Mock data para visitas
  const visitsData = [
    { date: '2025-09-18', visitors: 45, pageViews: 123, bounceRate: 35 },
    { date: '2025-09-17', visitors: 52, pageViews: 145, bounceRate: 28 },
    { date: '2025-09-16', visitors: 38, pageViews: 98, bounceRate: 42 },
    { date: '2025-09-15', visitors: 67, pageViews: 189, bounceRate: 31 },
    { date: '2025-09-14', visitors: 41, pageViews: 112, bounceRate: 38 }
  ];

  // Mock data para comentarios
  const comments = [
    { id: 1, name: 'María García', email: 'maria@email.com', comment: 'Excelente servicio, muy profesionales', page: 'Servicios', date: '2025-09-18', status: 'aprobado' },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', comment: 'Me gustaría más información sobre precios', page: 'Contacto', date: '2025-09-17', status: 'pendiente' },
    { id: 3, name: 'Ana Rodríguez', email: 'ana@email.com', comment: 'Gran trabajo en el diseño web', page: 'Portfolio', date: '2025-09-16', status: 'aprobado' },
    { id: 4, name: 'Pedro Sánchez', email: 'pedro@email.com', comment: 'Comentario spam', page: 'Inicio', date: '2025-09-15', status: 'rechazado' },
    { id: 5, name: 'Laura Martínez', email: 'laura@email.com', comment: '¿Ofrecen mantenimiento mensual?', page: 'Servicios', date: '2025-09-14', status: 'pendiente' }
  ];

  // Mock data para cotizaciones
  const quotes = [
    { id: 1, clientName: 'Empresa ABC', email: 'contacto@empresaabc.com', service: 'Desarrollo Web', budget: 2500, status: 'pendiente', date: '2025-09-18' },
    { id: 2, clientName: 'Tienda Online XYZ', email: 'info@tiendaxyz.com', service: 'E-commerce', budget: 4500, status: 'aprobada', date: '2025-09-17' },
    { id: 3, clientName: 'Restaurante Gourmet', email: 'reservas@gourmet.com', service: 'Sitio Web + SEO', budget: 3200, status: 'en_progreso', date: '2025-09-16' },
    { id: 4, clientName: 'Consultoría Tech', email: 'admin@techconsult.com', service: 'Aplicación Móvil', budget: 8000, status: 'completada', date: '2025-09-15' },
    { id: 5, clientName: 'Clínica Médica', email: 'info@clinica.com', service: 'Sistema de Gestión', budget: 6500, status: 'pendiente', date: '2025-09-14' }
  ];

  const recentPages = [
    { id: 1, title: 'Página Principal', status: 'Publicado', views: 234 },
    { id: 2, title: 'Servicios', status: 'Borrador', views: 0 },
    { id: 3, title: 'Contacto', status: 'Publicado', views: 156 },
    { id: 4, title: 'Acerca de', status: 'Publicado', views: 98 }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'visits', label: 'Visitas', icon: TrendingUp },
    { id: 'comments', label: 'Comentarios', icon: MessageSquare },
    { id: 'quotes', label: 'Cotizaciones', icon: DollarSign },
    { id: 'pages', label: 'Páginas', icon: FileText },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visitantes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.visitors.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Páginas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BarChart3 className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ingresos</p>
              <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Pages */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Páginas Recientes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentPages.map(page => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{page.title}</h4>
                  <p className="text-sm text-gray-600">{page.views} vistas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    page.status === 'Publicado'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisits = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Análisis de Visitas</h2>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visitantes Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{visitsData[0].visitors}</p>
              <p className="text-sm text-green-600">+12% vs ayer</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Páginas Vistas</p>
              <p className="text-2xl font-bold text-gray-900">{visitsData[0].pageViews}</p>
              <p className="text-sm text-green-600">+8% vs ayer</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="text-orange-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasa Rebote</p>
              <p className="text-2xl font-bold text-gray-900">{visitsData[0].bounceRate}%</p>
              <p className="text-sm text-red-600">+3% vs ayer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de visitas */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Visitas Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitantes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Páginas Vistas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Rebote</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitsData.map((visit, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.visitors}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.pageViews}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.bounceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderComments = () => {
    const handleEditComment = (comment) => {
      console.log('Editando comentario:', comment); // Debug
      setEditingComment(comment.id);
      setEditForm({
        name: comment.name || '',
        email: comment.email || '',
        comment: comment.comment || ''
      });
    };

    const handleSaveEdit = async () => {
      try {
        // Verificar si es un comentario de Firebase o mock
        const isFirebaseComment = comentarios.some(c => c.id === editingComment);

        if (isFirebaseComment) {
          await editarComentario(editingComment, editForm);
          console.log('Comentario de Firebase editado exitosamente');
        } else {
          console.log('Comentario mock editado localmente (no se guarda en BD)');
          // Aquí podrías mostrar un toast indicando que es solo local
        }

        setEditingComment(null);
        setEditForm({ name: '', email: '', comment: '' });
      } catch (error) {
        console.error('Error al guardar comentario:', error);
        // Aquí podrías mostrar un toast de error
      }
    };

    const handleCancelEdit = () => {
      setEditingComment(null);
      setEditForm({ name: '', email: '', comment: '' });
    };

    const handleDeleteComment = async (id) => {
      if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        try {
          const isFirebaseComment = comentarios.some(c => c.id === id);

          if (isFirebaseComment) {
            await eliminarComentario(id);
            console.log('Comentario de Firebase eliminado exitosamente');
          } else {
            console.log('Comentario mock eliminado localmente (no se elimina de BD)');
            // Aquí podrías mostrar un toast indicando que es solo local
          }
        } catch (error) {
          console.error('Error al eliminar comentario:', error);
        }
      }
    };

    const handleStatusChange = async (id, newStatus) => {
      try {
        const isFirebaseComment = comentarios.some(c => c.id === id);

        if (isFirebaseComment) {
          await cambiarEstadoComentario(id, newStatus);
          console.log('Estado de comentario de Firebase cambiado exitosamente');
        } else {
          console.log('Estado de comentario mock cambiado localmente (no se guarda en BD)');
          // Aquí podrías mostrar un toast indicando que es solo local
        }
      } catch (error) {
        console.error('Error al cambiar estado:', error);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Comentarios</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => comentariosToShow.filter(c => c.status === 'pendiente').forEach(c => handleStatusChange(c.id, 'aprobado'))}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Aprobar Todos Pendientes
            </button>
          </div>
        </div>

        {errorComentarios && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{errorComentarios}</p>
          </div>
        )}

        {/* Estadísticas de comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-green-600">
              {comentariosToShow.filter(c => c.status === 'aprobado').length}
            </p>
            <p className="text-sm text-gray-600">Aprobados</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {comentariosToShow.filter(c => c.status === 'pendiente').length}
            </p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-red-600">
              {comentariosToShow.filter(c => c.status === 'rechazado').length}
            </p>
            <p className="text-sm text-gray-600">Rechazados</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-blue-600">{comentariosToShow.length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>

        {/* Lista de comentarios */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Comentarios Recientes</h3>
          </div>

          {loadingComentarios ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando comentarios...</p>
            </div>
          ) : comentariosToShow.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay comentarios aún
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {comentariosToShow.map(comment => (
                <div key={comment.id} className="p-6">
                  {editingComment === comment.id ? (
                    <div className="space-y-4 border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center mb-4">
                        <Edit className="text-blue-600 mr-2" size={20} />
                        <h3 className="text-lg font-medium text-blue-900">Editando Comentario</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nombre del usuario"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="correo@ejemplo.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                        <textarea
                          value={editForm.comment}
                          onChange={(e) => setEditForm({...editForm, comment: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="4"
                          placeholder="Contenido del comentario"
                        />
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={handleSaveEdit}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                        >
                          <Check size={18} className="mr-2" />
                          Guardar Cambios
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                        >
                          <XIcon size={18} className="mr-2" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{comment.name}</h4>
                          <p className="text-sm text-gray-600">{comment.email}</p>
                          <p className="text-sm text-gray-500">
                            Página: {comment.page || 'General'} • {comment.createdAt?.toDate?.()?.toLocaleDateString() || comment.createdAt?.toLocaleDateString?.() || 'Fecha no disponible'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            comment.status === 'aprobado' ? 'bg-green-100 text-green-800' :
                            comment.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {comment.status}
                          </span>
                          {comentarios.some(c => c.id === comment.id) ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Firebase
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                              Demo
                            </span>
                          )}
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditComment(comment)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                      <div className="mt-4 flex space-x-2">
                        {comment.status === 'pendiente' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(comment.id, 'aprobado')}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleStatusChange(comment.id, 'rechazado')}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                            >
                              Rechazar
                            </button>
                          </>
                        )}
                        {comment.status === 'aprobado' && (
                          <button
                            onClick={() => handleStatusChange(comment.id, 'rechazado')}
                            className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                          >
                            Marcar como Spam
                          </button>
                        )}
                        {comment.status === 'rechazado' && (
                          <button
                            onClick={() => handleStatusChange(comment.id, 'aprobado')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Restaurar
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuotes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Cotizaciones</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus size={16} className="mr-2" />
          Nueva Cotización
        </button>
      </div>

      {/* Estadísticas de cotizaciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-yellow-600">{quotes.filter(q => q.status === 'pendiente').length}</p>
          <p className="text-sm text-gray-600">Pendientes</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-blue-600">{quotes.filter(q => q.status === 'en_progreso').length}</p>
          <p className="text-sm text-gray-600">En Progreso</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-green-600">{quotes.filter(q => q.status === 'aprobada' || q.status === 'completada').length}</p>
          <p className="text-sm text-gray-600">Completadas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-purple-600">${quotes.reduce((sum, q) => sum + q.budget, 0).toLocaleString()}</p>
          <p className="text-sm text-gray-600">Valor Total</p>
        </div>
      </div>

      {/* Lista de cotizaciones */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Cotizaciones Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map(quote => (
                <tr key={quote.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{quote.clientName}</div>
                      <div className="text-sm text-gray-500">{quote.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${quote.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      quote.status === 'completada' ? 'bg-green-100 text-green-800' :
                      quote.status === 'aprobada' ? 'bg-blue-100 text-blue-800' :
                      quote.status === 'en_progreso' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Páginas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus size={16} className="mr-2" />
          Nueva Página
        </button>
      </div>

      {/* Estadísticas de páginas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-green-600">{recentPages.filter(p => p.status === 'Publicado').length}</p>
          <p className="text-sm text-gray-600">Publicadas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-yellow-600">{recentPages.filter(p => p.status === 'Borrador').length}</p>
          <p className="text-sm text-gray-600">Borradores</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-blue-600">{recentPages.reduce((sum, p) => sum + p.views, 0)}</p>
          <p className="text-sm text-gray-600">Vistas Totales</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-purple-600">{recentPages.length}</p>
          <p className="text-sm text-gray-600">Total Páginas</p>
        </div>
      </div>

      {/* Lista de páginas */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Páginas del Sitio</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentPages.map(page => (
            <div key={page.id} className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{page.title}</h4>
                <p className="text-sm text-gray-600">{page.views} vistas</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  page.status === 'Publicado'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {page.status}
                </span>
                <div className="flex space-x-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'visits':
        return renderVisits();
      case 'comments':
        return renderComments();
      case 'quotes':
        return renderQuotes();
      case 'pages':
        return renderPages();
      case 'users':
        return <div className="text-center py-12 text-gray-500">Gestión de usuarios próximamente</div>;
      case 'analytics':
        return <div className="text-center py-12 text-gray-500">Analytics próximamente</div>;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">Configuración próximamente</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-900">Panel Admin</h1>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t flex-shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        <div className="p-6 border-b bg-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">WebSy Admin</h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;