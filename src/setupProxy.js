const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api-v1-project',
    createProxyMiddleware({
      target: 'http://project-svc/api/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api-v1-project': '',
      },
    })
  );
};
