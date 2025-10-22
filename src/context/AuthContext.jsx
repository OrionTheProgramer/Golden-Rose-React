import { createContext, useState, useContext } from 'react';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'));

  const login = (role, token) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('token', token);
    setUserRole(role); 
  };


  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};