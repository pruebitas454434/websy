import { useState, useEffect, useCallback } from 'react';

const useAdminPanel = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [sequence, setSequence] = useState([]);

  const handleKeyPress = useCallback((event) => {
    const key = event.key;
    setSequence(prev => {
      const newSequence = [...prev, key].slice(-2); // Mantener solo los últimos 2 caracteres

      // Verificar si la secuencia es '56'
      if (newSequence.join('') === '56') {
        if (isLoggedIn) {
          setShowPanel(true);
        } else {
          setShowLogin(true);
        }
        return []; // Resetear secuencia después de activar
      }

      return newSequence;
    });
  }, [isLoggedIn]);

  const handleLogin = useCallback((email, password) => {
    // Credenciales simples para demo
    if (email === 'agustin123' && password === 'websy123') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setShowPanel(true);
      return true;
    }
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setShowPanel(false);
  }, []);

  const closeLogin = useCallback(() => {
    setShowLogin(false);
  }, []);

  const closePanel = useCallback(() => {
    setShowPanel(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    showLogin,
    showPanel,
    isLoggedIn,
    handleLogin,
    handleLogout,
    closeLogin,
    closePanel
  };
};

export default useAdminPanel;