
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './components/FormProvider';
import Home from './components/Home';
import Path from './components/Path';
import Amplitude from './components/Amplitude';

function App() {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Path" element={<Path />} />
          <Route path="/Amplitude" element={<Amplitude />} />
        </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;
