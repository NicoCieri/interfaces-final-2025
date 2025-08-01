export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  year: number;
  availableQuantity: number;
  cover: string;
  featured: boolean;
  favorite: boolean;
};

export type Pagination = {
  first: number;
  last: number;
  next: number;
  prev: number;
  pages: number;
  items: number;
};

export type PaginationResponse = Pagination & {
  data: Book[];
};

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export type Rol = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Rol;
}

type Prestamo = {
  book: Book;
  quantity: number;
};

type PrestamosContextType = {
  prestamos: Prestamo[];
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: number) => void;
  isFavorite: (bookId: number) => boolean;
  clearFavorites: () => void;
  addPrestamo: (book: Book, quantity: number) => void;
  removePrestamo: (bookId: number, quantity: number) => void;
  togglePrestamo: (book: Book) => void;
  clearPrestamos: () => void;
  isPrestamo: (bookId: number) => boolean;
  totalPrestamos: number;
};
