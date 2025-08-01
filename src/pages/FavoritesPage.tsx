import { BookCard } from "../components/BookCard";
import { Container } from "../components/Container";
import { useFavorites } from "../hooks/useFavorites";

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  console.log(favorites);
  return (
    <div className="flex flex-col gap-6 py-6 ">
      <Container>
        <h2 className="text-4xl font-bold mb-4">Favoritos</h2>
        {favorites.length === 0 && (
          <p className="text-center text-gray-100 py-16">No hay favoritos</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite) => (
            <BookCard key={favorite.id} book={favorite} />
          ))}
        </div>
      </Container>
    </div>
  );
};
