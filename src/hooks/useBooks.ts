import { useCallback, useEffect, useState } from "react";
import type { PaginationResponse } from "../types";

interface UseBooksProps {
  featured?: boolean;
  page?: number;
  per_page?: number;
  title?: string;
  category?: string;
  sort?: string;
}

export const useBooks = ({
  featured,
  page = 1,
  per_page = 10,
  title,
  category,
  sort,
}: UseBooksProps = {}) => {
  const [data, setData] = useState<PaginationResponse>({
    data: [],
    first: 0,
    last: 0,
    next: 0,
    prev: 0,
    pages: 0,
    items: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = new URL("http://localhost:3001/books");

      if (featured !== undefined) {
        url.searchParams.append("featured", featured.toString());
      }

      url.searchParams.append("_per_page", per_page.toString());
      url.searchParams.append("_page", page.toString());
      if (title) {
        url.searchParams.append("title", title);
      }
      if (category) {
        url.searchParams.append("category", category);
      }
      if (sort) {
        url.searchParams.append("_sort", sort);
      }

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Error al cargar los libros");
      const data = await response.json();
      setData(data);
      setIsError(false);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [featured, per_page, page, title, category, sort]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, featured, per_page, page, title, category, sort]);

  return {
    data,
    isLoading,
    error,
    isError,
    refetch: fetchPosts,
  };
};
