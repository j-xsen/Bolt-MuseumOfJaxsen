import React from 'react';
import { ArtPiece } from '../types/art';
import { Eye, User, Calendar, Heart } from 'lucide-react';

interface ArtCardProps {
  artPiece: ArtPiece;
  onView: () => void;
}

export const ArtCard: React.FC<ArtCardProps> = ({ artPiece, onView }) => {
  return (
    <div className="group cursor-pointer" onClick={onView}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-secondary-200">
        <div className="relative overflow-hidden">
          <div 
            className="w-full h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${artPiece.imageUrl})`, // Use imageUrl which contains the low-res image
              aspectRatio: artPiece.ratio 
            }}
          />
          <div className="absolute inset-0 bg-accent-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Eye size={24} className="text-secondary-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={artPiece.artistAvatar}
              alt={artPiece.artist}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-accent-900 line-clamp-1">
                {artPiece.title}
              </h3>
              <p className="text-sm text-secondary-500 flex items-center">
                <User size={14} className="mr-1" />
                {artPiece.artist}
              </p>
            </div>
            <div className="flex items-center text-xs text-secondary-500">
              <Calendar size={12} className="mr-1" />
              {artPiece.month} {artPiece.year}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1 text-primary-600">
              <Heart size={14} />
              <span className="text-sm font-medium">Donations Welcome</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-secondary-500">{artPiece.medium}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};