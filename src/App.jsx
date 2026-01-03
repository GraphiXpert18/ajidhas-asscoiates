import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Art from './pages/Art/Art';
import ArtLanding from './pages/ArtLanding/ArtLanding';
import ArchitectureLanding from './pages/ArchitectureLanding/ArchitectureLanding';
import ArchitectureContact from './pages/ArchitectureLanding/ArchitectureContact';
import ArchitectureInquiry from './pages/ArchitectureLanding/ArchitectureInquiry';
import Artist from './pages/Artist/Artist';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<ArtLanding />} />
          <Route path="/art/gallery" element={<Art />} />
          <Route path="/art/artist" element={<Artist />} />
          <Route path="/architecture" element={<ArchitectureLanding />} />
          <Route path="/architecture/contact" element={<ArchitectureContact />} />
          <Route path="/architecture/inquiry" element={<ArchitectureInquiry />} />
          {/* Add other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
