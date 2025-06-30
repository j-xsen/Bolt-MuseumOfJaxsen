import React, { useState, useEffect } from 'react';
import { ArtPiece } from '../types/art';
import { TipModal } from './TipModal';
import { Heart, Calendar, Palette, Tag, MapPin, Award, Maximize2, X } from 'lucide-react';

interface ArtDetailProps {
  artPiece: ArtPiece;
}

export const ArtDetail: React.FC<ArtDetailProps> = ({ artPiece }) => {
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Disable/enable body scroll when fullscreen is toggled
  useEffect(() => {
    if (isFullscreenOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreenOpen]);

  const handleFullscreenToggle = () => {
    if (artPiece.hiResImageUrl) {
      setIsFullscreenOpen(!isFullscreenOpen);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-secondary-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <div 
                className="w-full h-full bg-cover bg-center min-h-96"
                style={{ 
                  backgroundImage: `url(${artPiece.imageUrl})`
                }}
              />
              {artPiece.hiResImageUrl && (
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleFullscreenToggle}
                    className="bg-white bg-opacity-90 backdrop-blur-sm py-2 px-3 rounded-lg font-semibold hover:bg-opacity-100 transition-all duration-200 hover:ring-2 hover:ring-primary-500"
                    title="View in full screen"
                  >
                    <Maximize2 size={16} className="text-secondary-500 hover:text-primary-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Award size={20} className="text-primary-500" />
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                    Opening Exhibition
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-accent-900 mb-2">
                  {artPiece.title}
                </h1>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={artPiece.artistAvatar}
                    alt={artPiece.artist}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg text-secondary-600 font-medium">
                      {artPiece.artist}
                    </p>
                    <p className="text-sm text-secondary-500">Founding Artist of Jaxsenville</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-500">Created</p>
                      <p className="font-semibold text-accent-900">
                        {artPiece.month} {artPiece.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Palette size={18} className="text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-500">Medium</p>
                      <p className="font-semibold text-accent-900">
                        {artPiece.medium}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <Tag size={18} className="text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-500">Collection</p>
                      <span className="inline-block bg-secondary-300 text-secondary-600 px-3 py-1 rounded-full text-sm font-medium">
                        {artPiece.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-accent-900 mb-3 flex items-center space-x-2">
                    <MapPin size={20} className="text-primary-500" />
                    <span>About the Founding Artist</span>
                  </h3>
                  <p className="text-secondary-600 leading-relaxed mb-4">
                    {artPiece.artistBio}
                  </p>
                  <p className="text-sm text-secondary-500 italic">
                    As the founder of Jaxsenville, this artist's vision extends beyond the canvas 
                    to encompass the entire cultural landscape of our community.
                  </p>
                </div>

                <div className="pt-6 border-t border-secondary-200">
                  <button
                    onClick={() => setIsTipModalOpen(true)}
                    className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Heart size={20} />
                    <span>Support the Museum & Artist</span>
                  </button>
                  <p className="text-sm text-secondary-500 text-center mt-2">
                    Your donation supports both the artist and the museum's mission
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreenOpen && artPiece.hiResImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsFullscreenOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-200"
              title="Close fullscreen"
            >
              <X size={24} />
            </button>
            <img
              src={artPiece.hiResImageUrl}
              alt={artPiece.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{
                maxHeight: '100vh'
              }}
            />
          </div>
        </div>
      )}

      <TipModal
        isOpen={isTipModalOpen}
        onClose={() => setIsTipModalOpen(false)}
        artistName={artPiece.artist}
        artTitle={artPiece.title}
      />
    </div>
  );
};