import { createContext } from "react";
import type { PrestamosContextType } from "../types";

export const PrestamosContext = createContext<PrestamosContextType | undefined>(
  undefined
);
