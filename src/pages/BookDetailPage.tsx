import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { Button, Card, Image, Spinner, Chip } from "@heroui/react";
import { useBook } from "../hooks/useBook";
import { useState } from "react";
import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react";
import { QuantityCounter } from "../components/QuantityCounter";
import { getCategoryColor } from "../utils";
import { useFavorites } from "../hooks/useFavorites";
import { usePrestamos } from "../hooks/usePrestamo";

export const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, isLoading, isError } = useBook({ id: id as string });
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const isFavoriteBook = isFavorite(book?.id as number);
  const { addPrestamo, prestamos } = usePrestamos();

  if (isLoading)
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </Container>
    );

  if (!book || isError)
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <p className="text-base text-gray-100">Libro no encontrado</p>
        </div>
      </Container>
    );

  const currentPrestamoQuantity = prestamos.find(
    (p) => p.book.id === book.id
  )?.quantity;
  const maxQuantity = book.availableQuantity - (currentPrestamoQuantity || 0);
  const canAddMore = maxQuantity > 0;

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddPrestamo = () => {
    if (canAddMore && quantity > 0) {
      addPrestamo(book, quantity);
      setQuantity(1);
    }
  };

  const handleToggleFavorite = () => {
    if (isFavoriteBook) {
      removeFavorite(book?.id as number);
    } else {
      addFavorite(book);
    }
  };

  const handleGoBack = () => {
    navigate("/libros");
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 py-8 md:px-8">
        <Button
          variant="flat"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onPress={handleGoBack}
          className="self-start"
        >
          Volver a Libros
        </Button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={book.cover}
              alt={book.title}
              width={400}
              height={200}
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          <Card className="w-full p-6 bg-content1 border border-divider shadow-xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <h1 className="text-3xl font-bold text-foreground">
                    {book.title}
                  </h1>
                  {book.featured && (
                    <Chip
                      startContent={<Star className="w-4 h-4" />}
                      color="warning"
                      variant="flat"
                      size="sm"
                    >
                      Destacado
                    </Chip>
                  )}
                </div>
                <p className="text-lg text-default-600">por {book.author}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-content2 rounded-lg">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-default-500">Año de publicación</p>
                  <p className="text-base font-medium text-foreground">
                    {book.year}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-default-500">Categoría</p>
                  <Chip
                    color={getCategoryColor(book.category)}
                    variant="flat"
                    size="md"
                  >
                    {book.category}
                  </Chip>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-default-500">Stock disponible</p>
                  <p className="text-base font-medium text-foreground">
                    {book.availableQuantity} unidades
                  </p>
                </div>
                {currentPrestamoQuantity && currentPrestamoQuantity > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-default-500">En tu préstamo</p>
                    <p className="text-base font-medium text-primary">
                      {currentPrestamoQuantity} unidades
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Descripción
                  </h3>
                  <p className="text-base text-default-600 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 p-4 bg-content2 rounded-lg">
                  <QuantityCounter
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    maxQuantity={maxQuantity}
                    disabled={!canAddMore}
                  />

                  <div className="flex flex-col md:flex-row gap-3">
                    <Button
                      color="primary"
                      size="lg"
                      onPress={handleAddPrestamo}
                      isDisabled={!canAddMore || quantity <= 0}
                      startContent={<ShoppingCart className="w-5 h-5" />}
                      className="md:flex-1"
                    >
                      {canAddMore
                        ? `Agregar ${quantity} como préstamo`
                        : "No hay stock disponible"}
                    </Button>
                    <Button
                      color={isFavoriteBook ? "danger" : "default"}
                      variant="bordered"
                      size="lg"
                      onPress={handleToggleFavorite}
                      startContent={
                        <Heart
                          className={isFavoriteBook ? "fill-current" : ""}
                        />
                      }
                    >
                      {isFavoriteBook ? "Quitar" : "Favorito"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};
