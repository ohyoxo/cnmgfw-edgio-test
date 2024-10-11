const { Router } = require('@edgio/core/router');
const { connectorRoutes } = require('@edgio/connectors');

module.exports = new Router()
  // This will send all requests to your Node.js app
  .use(connectorRoutes);
