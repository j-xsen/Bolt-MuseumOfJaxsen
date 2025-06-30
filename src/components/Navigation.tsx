import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Heart} from 'lucide-react';
import {TipModal} from './TipModal';

export const Navigation: React.FC = () => {
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
        window.scrollTo({top: 0, behavior: 'instant'});
    };

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
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Donate Button */}
                            <button
                                onClick={() => setIsDonateModalOpen(true)}
                                className="bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center space-x-2"
                            >
                                <Heart size={18}/>
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