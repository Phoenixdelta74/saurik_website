import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppCTA from './components/WhatsAppCTA';
import ChatWidget from './components/ChatWidget';

import Home from './pages/Home';
import Software from './pages/Software';
import Hardware from './pages/Hardware';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Track from './pages/Track';
import Arthos from './pages/Arthos';
import UseCases from './pages/UseCases';
import WebsiteDevelopment from './pages/services/WebsiteDevelopment';
import CctvInstallation from './pages/services/CctvInstallation';
import CustomSoftware from './pages/services/CustomSoftware';

export function render(url) {
  const isTrackPage = url === '/track' || url === '/track/';
  const isArthosPage = url === '/arthos' || url === '/arthos/';

  let content;
  if (isTrackPage) {
    content = (
      <div className="min-h-screen flex flex-col bg-canvas text-ink-primary selection:bg-accent-teal selection:text-white">
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          <Routes>
            <Route path="/track" element={<Track />} />
            <Route path="/track/" element={<Track />} />
          </Routes>
        </main>
        <WhatsAppCTA />
        <ChatWidget />
      </div>
    );
  } else if (isArthosPage) {
    content = (
      <div className="min-h-screen flex flex-col bg-canvas text-ink-primary selection:bg-accent-teal selection:text-white">
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          <Routes>
            <Route path="/arthos" element={<Arthos />} />
            <Route path="/arthos/" element={<Arthos />} />
          </Routes>
        </main>
        <WhatsAppCTA />
        <ChatWidget />
      </div>
    );
  } else {
    content = (
      <div className="min-h-screen flex flex-col bg-canvas text-ink-primary selection:bg-accent-teal selection:text-white">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/software" element={<Software />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/use-cases/fmcg-demand-planning" element={<UseCases />} />
            <Route path="/use-cases/manufacturing-demand-planning" element={<UseCases />} />
            <Route path="/use-cases/apparel-demand-planning" element={<UseCases />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/cctv-installation" element={<CctvInstallation />} />
            <Route path="/services/custom-software" element={<CustomSoftware />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <WhatsAppCTA />
        <ChatWidget />
        <Footer />
      </div>
    );
  }

  const appHtml = renderToString(
    <StaticRouter location={url}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-white p-3">Skip to content</a>
      {content}
    </StaticRouter>
  );

  return appHtml;
}
