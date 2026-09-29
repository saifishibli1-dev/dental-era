import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import express from 'express';
import { defineConfig, Plugin } from 'vite';
import { processDentalChat } from './src/server/dentalChatService';

function dentalApiPlugin(): Plugin {
  const handler = async (req: any, res: any, next: any) => {
    const url = req.originalUrl || req.url || '';
    if (url.startsWith('/api/dental-chat')) {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      try {
        const payload = req.body || {};
        const { history = [], message = '' } = payload;
        const result = await processDentalChat(history, message);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (err: any) {
        console.error('[API /api/dental-chat] Error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to process request', details: err?.message }));
      }
      return;
    }
    next();
  };

  return {
    name: 'dental-api-endpoint',
    configureServer(server) {
      server.middlewares.use(express.json());
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(express.json());
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), dentalApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

