import { useContext } from "react";
import { PrestamosContext } from "../context/PrestamosContext";

export const usePrestamos = () => {
  const context = useContext(PrestamosContext);
  if (!context) {
    throw new Error("usePrestamos debe usarse dentro de un PrestamosProvider");
  }
  return {
    prestamos: context.prestamos,
    addPrestamo: context.addPrestamo,
    removePrestamo: context.removePrestamo,
    togglePrestamo: context.togglePrestamo,
    clearPrestamos: context.clearPrestamos,
    isPrestamo: context.isPrestamo,
    totalPrestamos: context.totalPrestamos,
  };
};
