import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { USE_CASE_PAGES } from '../data/useCaseAnalytics';

const useCaseMeta = Object.fromEntries(
  Object.entries(USE_CASE_PAGES).map(([path, page]) => [path, [page.title, page.description]])
);

const pages = {
  ...useCaseMeta,
  '/': [
    'Operational Technology & Field Workflows',
    'Replace operational guesswork with visible, controlled field workflows. SAURIK IT delivers field operations software (Saurik Track), custom digital systems, and regional IT hardware infrastructure across Tripura and Northeast India.'
  ],
  '/software': [
    'Data analytics, AI & operational software',
    'Explore custom operational software, predictive data analytics, and carefully bounded agentic AI workflows with mandatory human review.'
  ],
  '/hardware': [
    'CCTV, computers & server infrastructure',
    'Commercial and residential CCTV surveillance, business computer sales and servicing, and server installations across Tripura and Northeast India.'
  ],
  '/about': [
    'About SAURIK IT',
    'Learn about the operational technology, software engineering, and regional IT infrastructure services offered by SAURIK IT Private Limited.'
  ],
  '/contact': [
    'Discuss your requirement',
    'Prepare an email enquiry or open WhatsApp to discuss your field operations, custom software, or hardware requirement.'
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
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = pages[pathname] || ['Page not found', 'Find your way back to SAURIK IT services and contact information.'];
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
    meta('robots', pages[pathname] ? 'index,follow' : 'noindex,follow');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.append(canonical);
    }
    const cleanPath = pathname === '/track' ? '/track/' : pathname;
    canonical.href = `https://www.wwwsaurikit.com${cleanPath}`;
  }, [pathname]);
  return null;
}
