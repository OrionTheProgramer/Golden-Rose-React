import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    if (!userData) return;
    localStorage.setItem('userProfile', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userRole', userData.role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    setUser(null);
  };

  const userRole = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
