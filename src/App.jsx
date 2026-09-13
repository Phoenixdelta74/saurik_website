import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppCTA from './components/WhatsAppCTA';
import ChatWidget from './components/ChatWidget';
import PageMetadata from './components/PageMetadata';

import Home from './pages/Home';
import Software from './pages/Software';
import Hardware from './pages/Hardware';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Track from './pages/Track';

// Helper component to handle scrolling on route change or hash change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isTrackPage = pathname === '/track';

  if (isTrackPage) {
    return (
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Routes>
          <Route path="/track" element={<Track />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-primary selection:bg-accent-teal selection:text-white">
      {/* Persistent Sticky Header */}
      <Header />

      {/* Dynamic Route Content */}
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/software" element={<Software />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Floating WhatsApp Assistance Widget */}
      <WhatsAppCTA />

      {/* Global Floating Chat Assistant Widget */}
      <ChatWidget />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageMetadata />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-white p-3">Skip to content</a>
      <AppContent />
    </Router>
  );
}

export default App;
