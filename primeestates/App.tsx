import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Sell from './pages/Sell';
import Agents from './pages/Agents';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Home />} />
        <Route path="/rent" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;