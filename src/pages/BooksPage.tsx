import {
  Card,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { BookCard } from "../components/BookCard";
import { useBooks } from "../hooks/useBooks";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Container } from "../components/Container";

const CATEGORIES = [
  { key: "", label: "Todos" },
  { key: "Historia", label: "Historia" },
  { key: "Ficción", label: "Ficción" },
  { key: "Poesía", label: "Poesía" },
  { key: "Filosofía", label: "Filosofía" },
  { key: "Ciencia", label: "Ciencia" },
];

const SORT_OPTIONS = [
  { key: "", label: "Sin ordenar" },
  { key: "title", label: "Título A-Z" },
  { key: "-title", label: "Título Z-A" },
  { key: "author", label: "Autor A-Z" },
  { key: "-author", label: "Autor Z-A" },
];

export const BooksPage = () => {
  const [page, setPage] = useState(1);
  const [titleSearch, setTitleSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const debouncedSearch = useDebounce(titleSearch, 500);
  const { data, isLoading } = useBooks({
    page,
    per_page: 9,
    title: debouncedSearch,
    category,
    sort: sortBy,
  });
  const books = data.data;

  return (
    <div className="flex flex-col gap-6 py-6 ">
      <Container className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold mb-4">Libros</h2>

        <Card className="w-full p-4 bg-content1/80 backdrop-blur-sm shadow-xl mb-2">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="Buscar"
              labelPlacement="outside"
              placeholder="Buscar por título"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              className="md:flex-1"
            />
            <Select
              label="Categoría"
              labelPlacement="outside"
              placeholder="Seleccionar categoría"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="md:w-48"
            >
              {CATEGORIES.map((category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
            <Select
              label="Ordenar por"
              labelPlacement="outside"
              placeholder="Seleccionar orden"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="md:w-48"
            >
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </Card>

        <div className="flex flex-col gap-4 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading && (
              <div className="col-span-full py-4 flex justify-center items-center h-96">
                <Spinner />
              </div>
            )}
            {!isLoading &&
              books.map((book) => <BookCard key={book.id} book={book} />)}

            {books.length === 0 && !isLoading && (
              <div className="col-span-full py-4">
                <p className="text-center">No se encontraron libros</p>
              </div>
            )}
          </div>
          {books.length > 0 && !isLoading && (
            <Pagination
              showControls
              initialPage={1}
              total={data.pages}
              page={page}
              onChange={setPage}
            />
          )}
        </div>
      </Container>
    </div>
  );
};
