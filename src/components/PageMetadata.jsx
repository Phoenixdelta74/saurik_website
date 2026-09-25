import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { USE_CASE_PAGES } from '../data/useCaseAnalytics';

const useCaseMeta = Object.fromEntries(
  Object.entries(USE_CASE_PAGES).map(([path, page]) => [path, [page.title, page.description]])
);

export const PAGE_METADATA = {
  ...useCaseMeta,
  '/': [
    'Software, Field-Team Tools & IT Services in Tripura',
    'Based in Agartala, SAURIK IT builds field tracking software, custom applications, CCTV networks, and IT infrastructure for businesses across Tripura and Northeast India.'
  ],
  '/software': [
    'Software Development, AI & Operational Systems',
    'Explore custom operational software, predictive data analytics, and carefully bounded agentic AI workflows with mandatory human review.'
  ],
  '/hardware': [
    'CCTV, Computers & Server Infrastructure',
    'Commercial and residential CCTV surveillance, business computer sales and servicing, and server installations across Tripura and Northeast India.'
  ],
  '/about': [
    'About SAURIK IT',
    'Learn about the operational technology, software engineering, and regional IT infrastructure services offered by SAURIK IT Private Limited in Agartala, Tripura.'
  ],
  '/contact': [
    'Discuss your requirement',
    'Prepare an email enquiry or open WhatsApp to discuss your field operations, custom software, CCTV, or hardware requirement.'
  ],
  '/privacy': [
    'Privacy & enquiry information',
    'Understand how email and WhatsApp enquiry drafts work and where to ask about information handling.'
  ],
  '/track': [
    'Saurik Track — GPS Attendance & Van-Stock Tracking for Field Teams',
    "Know who's on shift, where visits happened, and what's left in the van. Saurik Track pairs GPS attendance with live inventory for field sales and service teams. Free 30-day trial."
  ],
  '/track/': [
    'Saurik Track — GPS Attendance & Van-Stock Tracking for Field Teams',
    "Know who's on shift, where visits happened, and what's left in the van. Saurik Track pairs GPS attendance with live inventory for field sales and service teams. Free 30-day trial."
  ],
  '/arthos': [
    'Arthos Invoice Studio — Offline & Cloud Invoicing',
    'GST-aware invoicing, collections tracking, price history, and Business Health analytics for small businesses. Standalone 100% offline Desktop and Cloud editions.'
  ],
  '/arthos/': [
    'Arthos Invoice Studio — Offline & Cloud Invoicing',
    'GST-aware invoicing, collections tracking, price history, and Business Health analytics for small businesses. Standalone 100% offline Desktop and Cloud editions.'
  ],
  '/services/website-development': [
    'Website Development & Design in Tripura',
    'Professional, mobile-first business websites, catalogs, and portals in Agartala, Tripura & Northeast India. Fast, SEO-ready, with local support.'
  ],
  '/services/cctv-installation': [
    'CCTV Installation & Maintenance in Tripura',
    'High-definition IP surveillance, NVR storage, and remote mobile viewing for commercial, retail, and residential premises across Agartala and Tripura.'
  ],
  '/services/custom-software': [
    'Custom Software Development in Tripura',
    'Custom web applications, operational portals, inventory tracking, and workflow automation built for businesses across Tripura and Northeast India.'
  ],
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = PAGE_METADATA[pathname] || ['Page not found', 'Find your way back to SAURIK IT services and contact information.'];
    document.title = (pathname === '/track' || pathname === '/track/') ? `${title}` : `${title} | SAURIK IT`;
    const meta = (key, value, attribute = 'name') => {
      let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.append(node); }
      node.content = value;
    };
    meta('description', description);
    meta('og:title', document.title, 'property');
    meta('og:description', description, 'property');
    meta('og:type', 'website', 'property');
    meta('robots', PAGE_METADATA[pathname] ? 'index,follow' : 'noindex,follow');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.append(canonical);
    }
    // Trailing slash consistency: /track/ and /arthos/ have trailing slashes; other pages don't
    const cleanPath = (pathname === '/track' || pathname === '/track/') ? '/track/' : (pathname === '/arthos' || pathname === '/arthos/') ? '/arthos/' : pathname;
    canonical.href = `https://www.saurikit.in${cleanPath}`;
  }, [pathname]);
  return null;
}
