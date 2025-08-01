import { useState } from "react";
import { Spinner } from "@heroui/react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import type { Book } from "../types";
import { BookTable } from "../components/admin/BookTable";
import { BookFormModal } from "../components/admin/BookFormModal";
import { DeleteConfirmationModal } from "../components/admin/DeleteConfirmationModal";
import { AdminHeader } from "../components/admin/AdminHeader";

interface BookFormData {
  title: string;
  author: string;
  description: string;
  category: string;
  year: string;
  availableQuantity: string;
  cover: string;
  featured: boolean;
}

export const AdminBooksPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useBooks({ per_page: 200 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
    category: "",
    year: "",
    availableQuantity: "",
    cover: "",
    featured: false,
  });

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleAddBook = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      author: "",
      description: "",
      category: "",
      year: "",
      availableQuantity: "",
      cover: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setIsEditing(true);
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      year: book.year.toString(),
      availableQuantity: book.availableQuantity.toString(),
      cover: book.cover,
      featured: book.featured,
    });
    setIsModalOpen(true);
  };

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const bookData = {
        ...formData,
        year: parseInt(formData.year),
        availableQuantity: parseInt(formData.availableQuantity),
      };

      if (isEditing && selectedBook) {
        await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        });
      } else {
        await fetch("http://localhost:3001/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        });
      }

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error al guardar libro:", error);
      throw error;
    }
  };

  const confirmDelete = async () => {
    try {
      if (!selectedBook) return;
      await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
        method: "DELETE",
      });
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-0">
        <AdminHeader title="Administración de Libros" onAdd={handleAddBook} />

        <BookTable
          books={data.data}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />

        <BookFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          book={selectedBook}
        />
      </div>
    </div>
  );
};
