"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getFavorite, createFavorite, deleteFavorite } from "@/src/services/favoriteService";


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

  // useEffect(() => {
    
  //   if(session?.user?.email){
  //   try {
  //       const storedFavs = localStorage.getItem(`favorites_${session.user.email}`);
  //       if (storedFavs) setFavorites( JSON.parse(storedFavs));
      
  //   } catch (error) {
  //     console.error("Error al leer sesión:", error);
  //     localStorage.removeItem("user"); // limpia el valor corrupto
  //   }
  // }else{
  //   setFavorites([])
  // }
  // }, [session]);

useEffect(() => {
    const loadFavorites = async () => {
      if (!session?.user?.id) {
        setFavorites([]);
        return;
      }
      const data = await getFavorite(session.user.id);
      // data trae objetos { productId: { _id, name, ... } }, extraemos solo el _id
      const ids = data.map((fav: any) => fav.productId._id);
      setFavorites(ids);
    };

    loadFavorites();
  }, [session]);

const toggleFavorite = async (productId: string) => {
    if (!session?.user?.id) {
      setAuthMessage("Debes iniciar sesión para agregar a favoritos");
      setTimeout(() => setAuthMessage(""), 3000);
      return;
    }

    const userId = session.user.id;
    const isFav = favorites.includes(productId);

    try {
      if (isFav) {
        await deleteFavorite(userId, productId);
        setFavorites((prev) => prev.filter((id) => id !== productId));
      } else {
        await createFavorite(userId, productId);
        setFavorites((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito", error);
    }
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
