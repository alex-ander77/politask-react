import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Rewards from "./components/Rewards/Rewards";
import Download from "./components/Download/Download";
import Gallery from "./components/Gallery/Gallery";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot"; // Importación agregada

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 

import AboutUs from "./pages/AboutUs";
import AppPage from "./pages/AppPage";
import Contacto from "./pages/Contacto";
import Galeria from "./pages/Galeria";
import Recompensas from "./pages/Recompensas";


import appFirebase from "./firebase";
console.log("Firebase conectado:", appFirebase);

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Rewards />
      <Download />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />


      <Chatbot/> 
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* 2. CREAMOS LA RUTA */}
    </Routes>
  );
}

export default App;