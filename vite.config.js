import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevPlugin(env) {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      // Inject env into process.env for local handlers
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        // 1. Handle Chatbot API (/api/chat)
        if (req.url?.startsWith('/api/chat')) {
          const chatModule = await import('./api/chat.js');
          const chatHandler = chatModule.default;

          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch (e) {
              req.body = {};
            }

            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            res.send = (data) => {
              res.end(data);
              return res;
            };

            try {
              await chatHandler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 2. Handle Text-to-Speech API (/api/tts)
        if (req.url?.startsWith('/api/tts')) {
          const ttsModule = await import('./api/tts.js');
          const ttsHandler = ttsModule.default;

          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch (e) {
              req.body = {};
            }

            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            res.send = (data) => {
              res.end(data);
              return res;
            };

            try {
              await ttsHandler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), apiDevPlugin(env)],
    server: {
      port: 3000,
      open: false,
      fs: {
        deny: ['scratch/**'],
      },
    },
    optimizeDeps: {
      entries: ['index.html'],
    },
  };
});

