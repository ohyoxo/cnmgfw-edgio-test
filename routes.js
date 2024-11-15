// routes.js
import { Router, edgioRoutes } from '@edgio/core'

export default new Router()
  // 静态文件路由
  .match('/tmp/:path*', ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24, // 1天缓存
      },
    });
    serveStatic('tmp/:path*');
  })
  // 所有其他请求都转发到Express应用
  .use(edgioRoutes)
