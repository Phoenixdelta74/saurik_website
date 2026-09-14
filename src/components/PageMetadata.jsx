import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pages = {
  '/': ['Software & IT infrastructure', 'Data analytics, Generative and Agentic AI, custom web and mobile applications, website services, CCTV, computers, and server installation from SAURIK IT.'],
  '/software': ['Data analytics, AI & app development', 'Explore data analytics, Generative AI, Agentic AI, custom web applications, website design and support, and mobile app development.'],
  '/hardware': ['CCTV, computers & server services', 'Discuss CCTV for your home or business, computer sales and servicing, or server installation and maintenance.'],
  '/about': ['About SAURIK IT', 'Learn about the software and hardware services offered by SAURIK IT Private Limited.'],
  '/contact': ['Discuss your requirement', 'Prepare an email enquiry or open WhatsApp to discuss your software project or hardware requirement.'],
  '/privacy': ['Privacy & enquiry information', 'Understand how email and WhatsApp enquiry drafts work and where to ask about information handling.'],
  '/track': [
    'Saurik Track | GPS attendance and van-stock for field teams',
    'Privacy-transparent GPS attendance, field visits, reports, and van-stock management for sales, distribution, and service teams. Free 30-day trial.'
  ],
  '/track/': [
    'Saurik Track | GPS attendance and van-stock for field teams',
    'Privacy-transparent GPS attendance, field visits, reports, and van-stock management for sales, distribution, and service teams. Free 30-day trial.'
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
  }, [pathname]);
  return null;
}
