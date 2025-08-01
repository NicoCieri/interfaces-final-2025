import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types";
import { useFavorites } from "../hooks/useFavorites";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AUTH_STORAGE_KEY = "auth-user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { clearFavorites } = useFavorites();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = await response.json();
      const [user] = data;
      if (user) {
        setUser(user);
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            ...user,
            password: undefined,
          })
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    clearFavorites();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
