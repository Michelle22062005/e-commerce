"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";

interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<ICartItem[]>([]);

  // Cargar carrito del usuario al iniciar o cambiar de usuario
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    try {
      const stored = localStorage.getItem(`cart_${user.id}`);
      setCart(stored ? JSON.parse(stored) : []);
    } catch {
      setCart([]);
    }
  }, [user]);

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (item: ICartItem) => {
    if (!user) return;
    setCart((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      return exists
        ? prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    if (!user) return;
    localStorage.removeItem(`cart_${user.id}`);
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);