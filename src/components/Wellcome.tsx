import { Button, Card } from "@heroui/react";
import { Link } from "react-router-dom";
import { LibrarySquare } from "lucide-react";

export const Wellcome = () => {
  return (
    <Card className="w-full p-8 md:p-12 text-center bg-content1 border border-divider shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <LibrarySquare className="w-12 h-12 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Bienvenido a la Biblioteca Online
          </h2>
        </div>
        <p className="text-base md:text-lg text-default-600 max-w-2xl">
          Aquí podrás encontrar una amplia gama de libros para leer y disfrutar.
          Explora nuestro catálogo y descubre nuevas historias.
        </p>
        <Link to="/libros">
          <Button color="primary" size="lg" className="font-semibold">
            Explorar Catálogo
          </Button>
        </Link>
      </div>
    </Card>
  );
};
