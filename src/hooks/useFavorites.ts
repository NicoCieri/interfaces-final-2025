import { useContext } from "react";
import { PrestamosContext } from "../context/PrestamosContext";

export const useFavorites = () => {
  const context = useContext(PrestamosContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un PrestamosProvider");
  }
  return {
    favorites: context.favorites,
    addFavorite: context.addFavorite,
    removeFavorite: context.removeFavorite,
    isFavorite: context.isFavorite,
    clearFavorites: context.clearFavorites,
  };
};
