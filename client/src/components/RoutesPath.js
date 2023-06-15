import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Path from './Path';
const RoutesPath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Path" element={<Path />} />

      </Routes>
    </Router>
  );
};

export default RoutesPath;