import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BooksPage } from "./pages/BooksPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { PrestamosPage } from "./pages/PrestamosPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminBooksPage } from "./pages/AdminBooksPage";
import { LoginPage } from "./pages/LoginPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto flex-1 w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/libros" element={<BooksPage />} />
          <Route path="/libros/:id" element={<BookDetailPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/prestamos" element={<PrestamosPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route
            path="/admin/libros"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminBooksPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
