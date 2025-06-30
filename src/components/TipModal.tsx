import React, { useState } from 'react';
import { X, Heart, DollarSign, MapPin, Loader2, CheckCircle, AlertCircle, Mail, ExternalLink } from 'lucide-react';
import { TipAmount } from '../types/art';
import { createDonation } from '../services/donation';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  artTitle: string;
}

const tipAmounts: TipAmount[] = [
  { amount: 5, label: '$5' },
  { amount: 10, label: '$10' },
  { amount: 25, label: '$25' },
  { amount: 50, label: '$50' },
  { amount: 100, label: '$100' }
];

type ModalState = 'form' | 'processing' | 'error';

export const TipModal: React.FC<TipModalProps> = ({
  isOpen,
  onClose,
  artistName,
  artTitle
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('form');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDonation = async () => {
    const amount = isCustom ? parseFloat(customAmount) : selectedAmount;
    
    if (!amount || amount < 1) {
      setErrorMessage('Please enter a valid donation amount of at least $1');
      return;
    }

    setModalState('processing');
    setErrorMessage('');

    try {
      const { url } = await createDonation({
        amount,
        email: donorEmail || undefined,
        artistName,
        artTitle,
      });

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Donation error:', error);
      setModalState('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handlePresetAmount = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleClose = () => {
    onClose();
    // Reset form state after a short delay to avoid visual glitches
    setTimeout(() => {
      setModalState('form');
      setSelectedAmount(null);
      setCustomAmount('');
      setDonorEmail('');
      setIsCustom(false);
      setErrorMessage('');
    }, 300);
  };

  const handleContactMuseum = () => {
    window.location.href = 'mailto:jaxsen@jxsen.com?subject=Donation Inquiry&body=I would like to make a donation to support the Museum of Jaxsen and the artist ' + artistName + ' for the artwork "' + artTitle + '".';
  };

  const getCurrentAmount = () => {
    return isCustom ? parseFloat(customAmount) : selectedAmount;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-accent-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative border border-secondary-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 transition-colors"
          disabled={modalState === 'processing'}
        >
          <X size={24} />
        </button>

        {modalState === 'error' && (
          <div className="text-center py-8">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-accent-900 mb-2">Payment System Unavailable</h3>
            <p className="text-secondary-600 mb-4 text-sm leading-relaxed">
              {errorMessage}
            </p>
            <div className="bg-secondary-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-secondary-600 leading-relaxed">
                <strong>Alternative:</strong> You can contact the museum directly to make your donation. 
                We appreciate your support and will help you complete your contribution.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setModalState('form')}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleContactMuseum}
                className="w-full bg-white border border-secondary-300 text-secondary-700 py-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail size={16} />
                <span>Contact Museum Directly</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        )}

        {modalState === 'processing' && (
          <div className="text-center py-8">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Loader2 size={32} className="text-primary-500 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-accent-900 mb-2">Redirecting to Payment</h3>
            <p className="text-secondary-600 mb-2">
              Processing your ${getCurrentAmount()?.toFixed(2)} donation...
            </p>
            <p className="text-sm text-secondary-500">
              You will be redirected to Stripe to complete your payment.
            </p>
          </div>
        )}

        {modalState === 'form' && (
          <>
            <div className="text-center mb-6">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">
                Support the Museum & Artist
              </h3>
              <p className="text-secondary-600 mb-2">
                Make a donation in appreciation of "{artTitle}" by {artistName}
              </p>
              <div className="flex items-center justify-center space-x-1 text-sm text-secondary-500">
                <MapPin size={14} />
                <span>Museum of Jaxsen</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-600 mb-3">
                  Choose a donation amount:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipAmounts.map((tip) => (
                    <button
                      key={tip.amount}
                      onClick={() => handlePresetAmount(tip.amount)}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200 ${
                        selectedAmount === tip.amount && !isCustom
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-secondary-200 hover:border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                      }`}
                    >
                      {tip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-600 mb-2">
                  Or enter a custom amount:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg transition-all duration-200 ${
                      isCustom && customAmount
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 focus:border-primary-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-600 mb-2">
                  Email for receipt (optional):
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-secondary-200 rounded-lg focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
              )}

              <button
                onClick={handleDonation}
                disabled={!selectedAmount && !customAmount}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors disabled:bg-secondary-300 disabled:cursor-not-allowed"
              >
                Donate ${getCurrentAmount()?.toFixed(2) || '0.00'}
              </button>
              
              <div className="text-xs text-secondary-500 text-center space-y-1">
                <p>Donations support both the artist and the museum's cultural mission</p>
                <p>Secure payment processing powered by Stripe</p>
                <p className="text-secondary-400">
                  Having issues? <button onClick={handleContactMuseum} className="text-primary-500 hover:text-primary-600 underline">Contact us directly</button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};