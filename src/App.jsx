import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollingLogos from './components/ScrollingLogos'
import Apps from './components/Apps'
import Stack from './components/Stack'
import About from './components/About'
import Partnership from './components/Partnership'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <ScrollingLogos />
        <Apps />
        <Stack />
        <About />
        <Partnership />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
