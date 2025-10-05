import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">List</Link> | <Link to="/gallery">Gallery</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/character/:id" element={<DetailView />} />
      </Routes>
    </Router>
  );
}
export default App;
