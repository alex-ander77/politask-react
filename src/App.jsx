import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Rewards from "./components/Rewards/Rewards";
import Download from "./components/Download/Download";
import Gallery from "./components/Gallery/Gallery";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import appFirebase from "./firebase";
console.log("Firebase conectado:", appFirebase);

function App() {
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
    </>
  );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
