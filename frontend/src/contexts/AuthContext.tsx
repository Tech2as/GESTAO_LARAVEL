import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type Role = "ADMIN" | "REGULADOR" | "OFICINA" | "SEGURADORA";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para verificar se o token é válido
const checkAuthToken = async () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  
  if (!token || !userData) {
    setIsLoading(false);
    return;
  }

  try {
    // Verifica se o token expirou LOCALMENTE primeiro
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    
    if (isExpired) {
      // Token expirado, limpa tudo
      logout();
      return;
    }

    // Token válido localmente, restaura o usuário
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(JSON.parse(userData));
    
  } catch (error) {
    logout();
  } finally {
    setIsLoading(false);
  }
};

  // Executa a verificação do token ao inicializar
  useEffect(() => {
    checkAuthToken();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete Axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};