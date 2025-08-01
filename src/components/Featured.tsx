import { useBooks } from "../hooks/useBooks";
import { BookCard } from "./BookCard";
import { Spinner } from "@heroui/react";

interface FeaturedProps {
  limit?: number;
}

export const Featured = ({ limit = 3 }: FeaturedProps) => {
  const { data, isLoading, isError } = useBooks({
    featured: true,
    per_page: limit,
  });
  const books = data.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-base text-gray-100">Error al cargar los libros</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Libros Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};
