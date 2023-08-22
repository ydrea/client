import Home from './pages/Home';
import About from './pages/About';
import Mapa from './pages/Mapa';
import Photos from './pages/Photos';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { Upload } from './pages/Upload';
import { Login } from './pages/Login';
import './App.css';
import Layout from './Layout';
//
import { Route, Routes, useLocation } from 'react-router-dom';
import Scroller from './Scroller';
import Private from './pages/protected/Private';
//
import { useEffect } from 'react';
import { store } from './redux/store';
import { Fileupload } from './pages/Fileupload';
import { Nav } from './comps/Nav';
import { Footer } from './comps/Footer';
import { HashLink } from 'react-router-hash-link';
//
function App() {
  //
  const location = useLocation();

  useEffect(() => {
    console.log(store);
  });
  return (
    <>
      <Nav />
      <Routes location={location} key={location.pathname}>
        <Route element={<Private />}>
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/photos/:signatura" element={<Photos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/fupload" element={<Fileupload />} /> */}
      </Routes>
      <Footer />
    </>
  );
}
export default App;
