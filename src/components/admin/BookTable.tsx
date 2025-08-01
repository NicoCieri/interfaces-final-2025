import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";
import { Edit, Trash2 } from "lucide-react";
import type { Book } from "../../types";
import { getCategoryColor } from "../../utils";

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BookTable = ({ books, onEdit, onDelete }: BookTableProps) => {
  return (
    <Table aria-label="Tabla de libros">
      <TableHeader>
        <TableColumn>Portada</TableColumn>
        <TableColumn>Título</TableColumn>
        <TableColumn>Autor</TableColumn>
        <TableColumn>Categoría</TableColumn>
        <TableColumn>Año</TableColumn>
        <TableColumn>Stock</TableColumn>
        <TableColumn>Destacado</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell>
              <img
                src={book.cover}
                alt={book.title}
                className="w-12 h-16 object-cover rounded"
              />
            </TableCell>
            <TableCell>
              <div className="font-semibold">{book.title}</div>
            </TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>
              <Chip
                color={getCategoryColor(book.category)}
                variant="flat"
                size="sm"
              >
                {book.category}
              </Chip>
            </TableCell>
            <TableCell>{book.year}</TableCell>
            <TableCell>
              <Chip
                color={book.availableQuantity ? "success" : "danger"}
                variant="flat"
                size="sm"
              >
                {book.availableQuantity}
              </Chip>
            </TableCell>
            <TableCell>
              {book.featured ? (
                <Chip color="warning" variant="flat" size="sm">
                  Sí
                </Chip>
              ) : (
                <Chip color="default" variant="flat" size="sm">
                  No
                </Chip>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="bordered"
                  onPress={() => onEdit(book)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  variant="bordered"
                  onPress={() => onDelete(book)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
