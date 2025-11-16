"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined" || stored === "null") {
      // Si hay basura, limpiamos
      localStorage.removeItem("user");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    } catch (err) {
      console.error("Error al parsear user desde localStorage:", err);
      localStorage.removeItem("user"); // limpiamos para evitar errores futuros
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
