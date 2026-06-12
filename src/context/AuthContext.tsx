"use client";
import { createContext, useContext, useState, useEffect } from "react";
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  favorites: string[];
  authMessage:string
  login: (userData: User) => void;
  logout: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);

        const storedFavs = localStorage.getItem(`favorites_${userData.id}`);
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      console.error("Error al leer sesión:", error);
      localStorage.removeItem("user"); // limpia el valor corrupto
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    try {
      const storedFavs = localStorage.getItem(`favorites_${userData.id}`);
      setFavorites(storedFavs ? JSON.parse(storedFavs) : []);
    } catch {
      setFavorites([]);
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
  };

  const toggleFavorite = (productId: string) => {
    if (!user) {
      setAuthMessage("Debes iniciar sesión para agregar a favoritos");
      setTimeout(() => setAuthMessage(""), 3000); // desaparece a los 3 segundos
      return;
    }
    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId) // quitar
        : [...prev, productId]; // agregar

      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <AuthContext.Provider
      value={{ user, favorites, authMessage, login, logout, toggleFavorite, isFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
