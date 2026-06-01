import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import SlantedMarquee from '../components/SlantedMarquee';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';

export default function Home() {
  return (
    <main className="snap-container">
      <GlobalBackground />
      <Navbar />
      <Hero />
      <About />
      <SlantedMarquee />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
