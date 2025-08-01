import { useCallback, useEffect, useState } from "react";
import type { Book } from "../types";

interface UseBookProps {
  id: string;
}

export const useBook = ({ id }: UseBookProps) => {
  const [data, setData] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = new URL(`http://localhost:3001/books/${id}`);

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Error al cargar el libro");
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
  }, [id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, id]);

  return {
    book: data,
    isLoading,
    error,
    isError,
    refetch: fetchPosts,
  };
};
