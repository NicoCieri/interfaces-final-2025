import { useEffect, useState, type ReactNode } from "react";
import type { Book, Prestamo } from "../types";
import { PrestamosContext } from "./PrestamosContext";

export const PrestamosProvider = ({ children }: { children: ReactNode }) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>(() => {
    const stored = localStorage.getItem("prestamos");
    return stored ? JSON.parse(stored) : [];
  });

  const [favorites, setFavorites] = useState<Book[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
  }, [prestamos]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book: Book) => {
    if (!favorites.some((f) => f.id === book.id)) {
      setFavorites((prev) => [...prev, book]);
    }
  };

  const removeFavorite = (bookId: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== bookId));
  };

  const isFavorite = (bookId: number) => {
    return favorites.some((f) => f.id === bookId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const addPrestamo = (book: Book, quantity: number) => {
    setPrestamos((prev) => {
      const existingIndex = prev.findIndex((p) => p.book.id === book.id);

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prev, { book, quantity }];
      }
    });
  };

  const removePrestamo = (bookId: number, quantity: number) => {
    setPrestamos((prev) => {
      const existingIndex = prev.findIndex((p) => p.book.id === bookId);

      if (existingIndex >= 0) {
        const currentQuantity = prev[existingIndex].quantity;
        const newQuantity = currentQuantity - quantity;

        if (newQuantity <= 0) {
          return prev.filter((p) => p.book.id !== bookId);
        } else {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQuantity,
          };
          return updated;
        }
      }

      return prev;
    });
  };

  const togglePrestamo = (book: Book) => {
    if (prestamos.some((p) => p.book.id === book.id)) {
      removePrestamo(book.id, 1);
    } else {
      addPrestamo(book, 1);
    }
  };

  const clearPrestamos = () => {
    setPrestamos([]);
  };

  const isPrestamo = (bookId: number) => {
    return prestamos.some((p) => p.book.id === bookId);
  };

  const totalPrestamos = prestamos.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <PrestamosContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        prestamos,
        addPrestamo,
        removePrestamo,
        togglePrestamo,
        clearPrestamos,
        isPrestamo,
        totalPrestamos,
      }}
    >
      {children}
    </PrestamosContext.Provider>
  );
};
