import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight, Gift } from 'lucide-react';

export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-accent-900 mb-2">
            Thank You for Your Support!
          </h1>
          <p className="text-secondary-600 mb-6">
            Your donation has been processed successfully and helps support the Museum of Jaxsen and our artists.
          </p>

          {/* Museum Info */}
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Gift size={18} className="text-primary-500" />
              <span className="font-semibold text-accent-900">About Your Impact</span>
            </div>
            <p className="text-sm text-secondary-600 leading-relaxed">
              Your generous donation directly supports the Museum of Jaxsen's mission to showcase 
              contemporary art and provide a cultural hub for the Jaxsenville community. Thank you 
              for helping us preserve and promote artistic expression.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleNavigateHome}
              className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Home size={18} />
              <span>Return to Museum</span>
            </button>
            
            <button
              onClick={() => window.location.href = 'mailto:jaxsen@jxsen.com?subject=Thank you for the donation'}
              className="w-full bg-white border border-secondary-300 text-secondary-700 py-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Contact the Museum</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-secondary-500 mt-6">
            A receipt for your donation has been sent to your email address if provided.
          </p>
        </div>
      </div>
    </div>
  );
};