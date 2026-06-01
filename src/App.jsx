import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CustomCursor from './components/CustomCursor';
import './styles/global.css';

const Details = lazy(() => import('./pages/Details'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Suspense fallback={<div className="page-loader">Loading...</div>}><Details /></Suspense>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
