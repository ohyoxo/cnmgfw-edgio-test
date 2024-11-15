// edgio.config.js
const { join } = require('path');

module.exports = {
  connector: '@edgio/express',
  express: {
    // 指定应用入口文件
    appPath: join(process.cwd(), 'index.js'),
  },
  // 确保包含所有需要的文件
  serverless: {
    include: ['tmp/**/*'],
  },
};
