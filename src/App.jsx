import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import Home from './pages/Home';
import Details from './pages/Details';
import CustomCursor from './components/CustomCursor';
import './styles/global.css';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <CustomCursor />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </LazyMotion>
  );
}
