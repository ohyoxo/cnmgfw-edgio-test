module.exports = {
  connector: '@edgio/nodejs-connector',

  nodejsConnector: {
    // buildFolder: '.', // Your project does not contain a build output, setting this to the current directory will cause subdirectory copy error as seen above. Normally this will be ./dist, etc
    entryFile: 'index.js',
    envPort: 'PORT',
    devCommand: 'node index.js', // instructs Edgio how to start your app server when running `edgio dev`
  },

  // Use the `origins` configuration for your upstream endpoints (https://docs.edg.io/applications/v7/performance/cdn_as_code/edgio_config#origins)
  // backends: {
    // The origin should not point to your local server
    // origin: {
    //   domainOrIp: 'localhost',
    //   hostHeader: 'localhost',
    // },
  // },
};
