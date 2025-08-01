import type { Book } from "../types";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Chip,
  Button,
  CardFooter,
} from "@heroui/react";
import { getCategoryColor } from "../utils";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { usePrestamos } from "../hooks/usePrestamo";
import { Heart, Plus, Minus } from "lucide-react";

interface BookCardProps {
  book: Book;
  isPrestamo?: boolean;
}

export const BookCard = ({ book, isPrestamo = false }: BookCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addPrestamo, removePrestamo, prestamos } = usePrestamos();
  const isFavoriteBook = isFavorite(book.id);
  const navigate = useNavigate();

  const currentPrestamo = prestamos.find((p) => p.book.id === book.id);
  const currentQuantity = currentPrestamo?.quantity || 0;
  const canAddMore = book.availableQuantity > currentQuantity;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavoriteBook) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const handleAddPrestamo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canAddMore) {
      addPrestamo(book, 1);
    }
  };

  const handleRemovePrestamo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQuantity > 0) {
      removePrestamo(book.id, 1);
    }
  };

  return (
    <div
      onClick={() => navigate(`/libros/${book.id}`)}
      className="cursor-pointer"
      tabIndex={0}
    >
      <Card
        className="py-2 pointer border-none bg-background/60 dark:bg-default-100/50 hover:shadow-lg transition-all duration-300"
        isHoverable
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
          <div className="flex justify-between w-full">
            <Chip color={getCategoryColor(book.category)} size="sm">
              {book.category}
            </Chip>
            <Button
              color={isFavoriteBook ? "danger" : "default"}
              variant="bordered"
              size="sm"
              onClick={handleToggleFavorite}
              isIconOnly
              startContent={
                <Heart
                  size={14}
                  className={isFavoriteBook ? "fill-current" : ""}
                />
              }
            />
          </div>
          <small className="text-sm text-gray-100">{book.author}</small>
          <h4 className="font-bold text-large">{book.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-contain rounded-xl w-full"
            src={book.cover}
            radius="lg"
            shadow="sm"
            height={153}
          />
        </CardBody>
        {isPrestamo && (
          <CardFooter className="px-4 pb-2">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-default-500">
                  Stock: {book.availableQuantity}
                </p>
                {currentQuantity > 0 && (
                  <p className="text-xs text-primary font-medium">
                    En préstamo: {currentQuantity}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  color="danger"
                  variant="bordered"
                  size="sm"
                  onClick={handleRemovePrestamo}
                  isIconOnly
                  isDisabled={currentQuantity === 0}
                  startContent={<Minus size={12} />}
                />
                <span className="text-sm font-medium min-w-[20px] text-center">
                  {currentQuantity}
                </span>
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                  onClick={handleAddPrestamo}
                  isIconOnly
                  isDisabled={!canAddMore}
                  startContent={<Plus size={12} />}
                />
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
