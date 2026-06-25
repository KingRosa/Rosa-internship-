import React, { useEffect } from "react"; // 1. Need to import useEffect
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AOS from "aos"; 
import "aos/dist/aos.css"; 

function App() {
 useEffect(() => {
  AOS.init({
    duration: 3000, // Make it very slow so you can see it
    once: false,    // Set to false so it re-triggers when you scroll
    mirror: true,   // Animates back and forth
  });
}, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
