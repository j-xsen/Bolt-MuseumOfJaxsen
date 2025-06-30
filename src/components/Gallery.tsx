import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtCard } from './ArtCard';
import { useArtPieces } from '../hooks/useArtPieces';
import { createSlug } from '../utils/urlUtils';
import { Search, Filter, MapPin, Calendar, Users, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { artPieces, loading, error, refetch } = useArtPieces();
  const navigate = useNavigate();

  const categories = ['All', ...Array.from(new Set(artPieces.map(piece => piece.category)))];

  const filteredArtPieces = artPieces.filter(piece => {
    const matchesSearch = piece.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         piece.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || piece.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewArt = (artPiece: any) => {
    const slug = createSlug(artPiece.title);
    navigate(`/art/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-accent-900 mb-2">Loading Exhibition</h2>
          <p className="text-secondary-600">Preparing the artworks for your visit...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-accent-900 mb-2">Unable to Load Exhibition</h2>
          <p className="text-secondary-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center justify-center space-x-2 mx-auto"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-accent-900 via-accent-500 to-secondary-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin size={24} className="text-secondary-300" />
              <span className="text-lg text-secondary-300">Jaxsenville</span>
            </div>
            <h1 className="text-6xl font-bold mb-6">
              Museum of Jaxsen
            </h1>
            <p className="text-xl text-secondary-300 max-w-4xl mx-auto mb-8">
              Welcome to Jaxsenville's newest cultural institution. Opening just months after 
              our town's founding, our museum showcases contemporary artworks that reflect the spirit and vision of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-secondary-300">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>Open Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={18} />
                <span>Free Admission</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Museum Info Section */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-accent-900 mb-4">Opening Exhibition</h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Featuring works by Jaxsen, our founding artist. This inaugural collection captures 
              the creative spirit that defines our newly founded community, with new pieces being 
              added regularly as the artist continues to create and our collection grows.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtPieces.map((artPiece) => (
            <ArtCard
              key={artPiece.id}
              artPiece={artPiece}
              onView={() => handleViewArt(artPiece)}
            />
          ))}
        </div>

        {filteredArtPieces.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-secondary-500 text-lg">
              {artPieces.length === 0 
                ? "No artworks are currently available in the exhibition."
                : "No artworks found matching your criteria."
              }
            </p>
          </div>
        )}
      </div>

      {/* Museum Footer Info */}
      <div className="bg-accent-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About the Museum</h3>
              <p className="text-secondary-300 text-sm leading-relaxed">
                The Museum of Jaxsen opened just months after the founding of Jaxsenville, 
                representing our community's immediate commitment to culture and creativity. 
                It stands as a testament to the artistic vision that defines our town.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Visit Information</h3>
              <div className="text-secondary-300 text-sm space-y-2">
                <p>📍 Jaxsenville</p>
                <p>🕒 Open Daily</p>
                <p>🎫 Free Admission</p>
                <p>📧 jaxsen@jxsen.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support the Arts</h3>
              <p className="text-secondary-300 text-sm leading-relaxed">
                Your contributions help support our artists and maintain this cultural 
                institution for future generations of Jaxsenville residents and visitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};