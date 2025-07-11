import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import IvyTetris from './pages/IvyTetris.jsx';
import TetrisPage from './pages/TetrisPage.jsx';
import OkayYoureIvy from './pages/OkayYoureIvy.jsx';
import TryAgainTetris from './pages/TryAgainTetris.jsx';
import ChessGame from './pages/ChessGame.jsx';
import WelcomeSequence from './pages/WelcomeSequence.jsx';
import LoveLetter from './pages/Letter1.jsx';
import Games from './pages/Games.jsx';
import ThingsILike from './pages/ThingsILike.jsx';
import Memories from './pages/Memories.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeSequence />} />
        <Route path="/games" element={<Games />} />
        <Route path="/loveLetter1" element={<LoveLetter />} />
        <Route path="/thingsILike" element={<ThingsILike />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/tetris" element={<TetrisPage />} />
        <Route path='/ivy-tetris' element={<IvyTetris />} />
        <Route path='/youre-ivy' element={<OkayYoureIvy />} />
        <Route path='/try-again-tetris' element={<TryAgainTetris />} />
      </Routes>
    </Router>
  );
};

export default App;