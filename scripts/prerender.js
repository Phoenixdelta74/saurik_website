import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const routes = [
  '/',
  '/software',
  '/hardware',
  '/about',
  '/contact',
  '/privacy',
  '/use-cases',
  '/use-cases/fmcg-demand-planning',
  '/use-cases/manufacturing-demand-planning',
  '/use-cases/apparel-demand-planning',
  '/services/website-development',
  '/services/cctv-installation',
  '/services/custom-software',
  '/404',
];

async function prerender() {
  console.log('--- Starting static prerender (SSG) for SAURIK IT ---');
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run "vite build" first before prerendering.');
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: rootDir,
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
    const { PAGE_METADATA } = await vite.ssrLoadModule('/src/components/PageMetadata.jsx');

    for (const route of routes) {
      const appHtml = render(route);

      let title, description, robots, canonical;
      if (route === '/404') {
        title = 'Page Not Found | SAURIK IT';
        description = 'The requested page could not be found. Find your way back to SAURIK IT services and contact information.';
        robots = 'noindex,follow';
        canonical = 'https://www.saurikit.in/404';
      } else {
        const meta = PAGE_METADATA[route] || ['Technology, Deliberately', 'SAURIK IT Private Limited'];
        title = meta[0].includes('SAURIK IT') ? meta[0] : `${meta[0]} | SAURIK IT`;
        description = meta[1];
        robots = 'index,follow';
        canonical = `https://www.saurikit.in${route === '/' ? '/' : route}`;
      }

      let html = baseTemplate;

      // Inject rendered app HTML into root container
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Update metadata tags
      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`);
      html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
      html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
      html = html.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`);
      html = html.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`);

      if (html.includes('<meta name="robots"')) {
        html = html.replace(/<meta name="robots" content=".*?"\s*\/?>/, `<meta name="robots" content="${robots}" />`);
      } else {
        html = html.replace('</head>', `  <meta name="robots" content="${robots}" />\n</head>`);
      }

      let outputPath;
      if (route === '/') {
        outputPath = path.resolve(distDir, 'index.html');
      } else if (route === '/404') {
        outputPath = path.resolve(distDir, '404.html');
      } else {
        const routeFolder = path.resolve(distDir, route.replace(/^\//, ''));
        fs.mkdirSync(routeFolder, { recursive: true });
        outputPath = path.resolve(routeFolder, 'index.html');
      }

      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`  ✔ Prerendered ${route} -> ${path.relative(rootDir, outputPath)} (${(html.length / 1024).toFixed(1)} KB)`);
    }

    console.log('--- Static prerendering completed successfully! ---');
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
