import { useState, useEffect } from 'react';
import { ArtPiece } from '../types/art';
import { fetchArtPieces } from '../services/contentful';

interface UseArtPiecesReturn {
  artPieces: ArtPiece[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useArtPieces = (): UseArtPiecesReturn => {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const pieces = await fetchArtPieces();
      setArtPieces(pieces);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error in useArtPieces:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    artPieces,
    loading,
    error,
    refetch: fetchData,
  };
};