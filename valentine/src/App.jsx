import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import TetrisPage from './pages/TetrisPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tetris" element={<TetrisPage />} />
      </Routes>
    </Router>
  );
};

export default App;