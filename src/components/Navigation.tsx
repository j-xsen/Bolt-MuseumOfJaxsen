import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Heart } from 'lucide-react';
import { TipModal } from './TipModal';

export const Navigation: React.FC = () => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDetailPage = location.pathname.startsWith('/art/');
  const isHomePage = location.pathname === '/';

  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateBack = () => {
    navigate(-1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Extract art title from URL for breadcrumb
  const getArtTitleFromPath = () => {
    if (isDetailPage) {
      const slug = location.pathname.split('/art/')[1];
      return slug?.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return null;
  };

  const artTitle = getArtTitleFromPath();

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div>
                <button
                  onClick={handleNavigateHome}
                  className="text-2xl font-bold text-accent-900 hover:text-primary-600 transition-colors duration-200"
                >
                  Museum of Jaxsen
                </button>
              </div>
              {isDetailPage && artTitle && (
                <div className="flex items-center space-x-2 text-sm text-secondary-500">
                  <span>/</span>
                  <span className="truncate max-w-48">{artTitle}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Donate Button */}
              <button
                onClick={() => setIsDonateModalOpen(true)}
                className="bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center space-x-2"
              >
                <Heart size={18} />
                <span>Donate</span>
              </button>

            </div>
          </div>
        </div>
      </nav>

      <TipModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        artistName="Jaxsen"
        artTitle="Jaxsen"
      />
    </>
  );
};