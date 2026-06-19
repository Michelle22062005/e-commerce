"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";


interface AuthContextType {
  favorites: string[];
  authMessage:string
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {data:session} = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    if(session?.user?.email){
    try {
        const storedFavs = localStorage.getItem(`favorites_${session.user.email}`);
        if (storedFavs) setFavorites( JSON.parse(storedFavs));
      
    } catch (error) {
      console.error("Error al leer sesión:", error);
      localStorage.removeItem("user"); // limpia el valor corrupto
    }
  }else{
    setFavorites([])
  }
  }, [session]);



  const toggleFavorite = (productId: string) => {
    if (!session) {
      setAuthMessage("Debes iniciar sesión para agregar a favoritos");
      setTimeout(() => setAuthMessage(""), 3000); // desaparece a los 3 segundos
      return;
    }
    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId) // quitar
        : [...prev, productId]; // agregar

      localStorage.setItem(`favorites_${session.user?.email}`, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <AuthContext.Provider
      value={{ favorites, authMessage, toggleFavorite, isFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
