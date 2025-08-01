import { Container } from "../components/Container";
import { usePrestamos } from "../hooks/usePrestamo";
import { BookCard } from "../components/BookCard";

export const PrestamosPage = () => {
  const { prestamos } = usePrestamos();
  return (
    <div className="flex flex-col gap-6 py-6 ">
      <Container>
        <h2 className="text-4xl font-bold mb-4">Prestamos</h2>
        {prestamos.length === 0 && (
          <p className="text-sm text-gray-100 py-16 text-center">
            No hay libros seleccionados aun.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prestamos.map((prestamo) => (
            <BookCard key={prestamo.book.id} book={prestamo.book} isPrestamo />
          ))}
        </div>
      </Container>
    </div>
  );
};
