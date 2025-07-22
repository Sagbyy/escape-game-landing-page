import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface User {
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setUser({ name: userName, token });
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userName", userData.name);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}
