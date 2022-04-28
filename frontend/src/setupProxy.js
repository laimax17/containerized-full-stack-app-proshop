const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //target: 'http://localhost:5001',
      target: process.env.backend,
      // target: 'http://127.0.0.1:5001',
      changeOrigin: true,
    })
  );
};