import React, { useState } from 'react';
import Home from './components/Home';
import LetterExplorer from './components/LetterExplorer';
import ObjectAssociation from './components/ObjectAssociation';
import SoundChallenge from './components/SoundChallenge';
import { audioManager } from './utils/audio_manager';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onSelectLevel={(level) => {
          if (level === 'easy') setCurrentView('explorer');
          if (level === 'medium') setCurrentView('association');
          if (level === 'hard') setCurrentView('challenge');
        }} />;
      case 'explorer':
        // onNext here effectively acts as "Back to Home" based on our button choice
        return <LetterExplorer onNext={() => setCurrentView('home')} />;
      case 'association':
        return <ObjectAssociation
          onNext={() => setCurrentView('home')}
          onBack={() => setCurrentView('home')}
        />;
      case 'challenge':
        return <SoundChallenge
          onBack={() => setCurrentView('home')}
        />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
}

export default App;
