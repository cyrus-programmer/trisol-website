import { Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollingLogos from "./components/ScrollingLogos";
import Apps from "./components/Apps";
import Stack from "./components/Stack";
import About from "./components/About";
import Partnership from "./components/Partnership";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ScrollToHash from "./components/ScrollToHash";

function Home() {
  return (
    <main>
      <Hero />
      <ScrollingLogos />
      <Apps />
      <Stack />
      <About />
      <Partnership />
    </main>
  );
}

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </>
  );
}
