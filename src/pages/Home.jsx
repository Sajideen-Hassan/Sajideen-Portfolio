import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LazySection from '../components/LazySection';
import GlobalBackground from '../components/GlobalBackground';

export default function Home() {
  return (
    <main className="snap-container">
      <GlobalBackground />
      <Navbar />
      <Hero />
      <LazySection load={() => import('../components/About')} timeout={200} />
      <LazySection load={() => import('../components/SlantedMarquee')} rootMargin="300px" />
      <LazySection load={() => import('../components/Skills')} rootMargin="300px" />
      <LazySection load={() => import('../components/Projects')} rootMargin="300px" />
      <LazySection load={() => import('../components/Testimonials')} rootMargin="300px" />
      <LazySection load={() => import('../components/Contact')} rootMargin="300px" />
      <LazySection load={() => import('../components/Footer')} rootMargin="300px" />
    </main>
  );
}
