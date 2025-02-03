import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import IvyTetris from './pages/IvyTetris.jsx';
import TetrisPage from './pages/TetrisPage.jsx';
import OkayYoureIvy from './pages/OkayYoureIvy.jsx';
import TryAgainTetris from './pages/TryAgainTetris.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tetris" element={<TetrisPage />} />
        <Route path='/ivy-tetris' element={<IvyTetris />} />
        <Route path='/youre-ivy' element={<OkayYoureIvy />} />
        <Route path='/try-again-tetris' element={<TryAgainTetris />} />
      </Routes>
    </Router>
  );
};

export default App;