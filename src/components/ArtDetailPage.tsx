import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArtDetail } from './ArtDetail';
import { findArtPieceBySlug } from '../utils/urlUtils';
import { ArtPiece } from '../types/art';
import { Loader2, AlertCircle } from 'lucide-react';

interface ArtDetailPageProps {
  artPieces: ArtPiece[];
}

export const ArtDetailPage: React.FC<ArtDetailPageProps> = ({ artPieces }) => {
  const { slug } = useParams<{ slug: string }>();

  // Show loading if art pieces haven't loaded yet
  if (artPieces.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-accent-900 mb-2">Loading Artwork</h2>
          <p className="text-secondary-600">Preparing the artwork details...</p>
        </div>
      </div>
    );
  }

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const artPiece = findArtPieceBySlug(artPieces, slug);

  if (!artPiece) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-accent-900 mb-2">Artwork Not Found</h2>
          <p className="text-secondary-600 mb-4">
            The artwork you're looking for doesn't exist or may have been moved.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  return <ArtDetail artPiece={artPiece} />;
};