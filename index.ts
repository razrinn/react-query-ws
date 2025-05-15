import reactHtmlEntry from './public/index.html';

Bun.serve({
  routes: {
    '/': reactHtmlEntry,
  },
  development: true,
  port: 3000,
});
