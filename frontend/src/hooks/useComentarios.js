import { useState, useEffect } from 'react';
import { saveComentario, subscribeComentarios } from '../firebase';
import { doc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore';

const useComentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeComentarios((docs) => {
      setComentarios(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const agregarComentario = async (comentarioData) => {
    try {
      setError(null);
      await saveComentario(comentarioData);
    } catch (err) {
      setError('Error al agregar comentario: ' + err.message);
      throw err;
    }
  };

  const editarComentario = async (id, comentarioData) => {
    try {
      setError(null);
      const db = getFirestore();
      const comentarioRef = doc(db, 'comentarios', id);
      await updateDoc(comentarioRef, {
        ...comentarioData,
        updatedAt: new Date()
      });
    } catch (err) {
      setError('Error al editar comentario: ' + err.message);
      throw err;
    }
  };

  const eliminarComentario = async (id) => {
    try {
      setError(null);
      const db = getFirestore();
      const comentarioRef = doc(db, 'comentarios', id);
      await deleteDoc(comentarioRef);
    } catch (err) {
      setError('Error al eliminar comentario: ' + err.message);
      throw err;
    }
  };

  const cambiarEstadoComentario = async (id, nuevoEstado) => {
    try {
      setError(null);
      const db = getFirestore();
      const comentarioRef = doc(db, 'comentarios', id);
      await updateDoc(comentarioRef, {
        status: nuevoEstado,
        updatedAt: new Date()
      });
    } catch (err) {
      setError('Error al cambiar estado: ' + err.message);
      throw err;
    }
  };

  return {
    comentarios,
    loading,
    error,
    agregarComentario,
    editarComentario,
    eliminarComentario,
    cambiarEstadoComentario
  };
};

export default useComentarios;