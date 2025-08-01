import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./context/AuthProvider";
import { PrestamosProvider } from "./context/PrestamosProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <PrestamosProvider>
          <AuthProvider>
            <main className="dark text-foreground bg-neutral-900">
              <App />
            </main>
          </AuthProvider>
        </PrestamosProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
