"use client"
import { createContext, useContext, useState, useEffect } from "react";
interface User{
    id:string;
    name:string;
    email:string
}
interface AuthContextType{
    user:User | null;
    login: (userData: User)=> void;
    logout:()=> void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [user, setUser]= useState<User | null>(null);

    useEffect(()=>{
        try {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    } catch (error) {
        console.error("Error al leer sesión:", error);
        localStorage.removeItem("user"); // limpia el valor corrupto
    }
    },[])

const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);