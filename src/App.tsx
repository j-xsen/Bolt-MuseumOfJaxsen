import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Gallery } from './components/Gallery';
import { ArtDetailPage } from './components/ArtDetailPage';
import { SuccessPage } from './components/SuccessPage';
import { useArtPieces } from './hooks/useArtPieces';
import BoltIcon from "./components/BoltIcon.tsx";

function App() {
  const { artPieces } = useArtPieces();

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route 
            path="/art/:slug" 
            element={<ArtDetailPage artPieces={artPieces} />} 
          />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <BoltIcon/>
      </div>
    </Router>
  );
}

export default App;