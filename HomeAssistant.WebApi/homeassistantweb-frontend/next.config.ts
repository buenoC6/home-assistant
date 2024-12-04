import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:all*',
        headers: [
          {
            key: 'content-security-policy',
            value: isDev
              ? '' // Relax policy in dev mode
              : "default-src 'self' data: https://uni003eu5.fusionsolar.huawei.com;" +
                "style-src 'self' 'unsafe-inline' fonts.googleapis.com;" +
                "base-uri 'none';" +
                "form-action 'self';" +
                "script-src 'self' 'unsafe-eval' 'unsafe-inline';" +
                "font-src 'self' fonts.gstatic.com;" +
                "manifest-src 'self';" +
                "img-src 'self' blob: https://uni003eu5.fusionsolar.huawei.com data:;" +
                "connect-src 'self' http://192.168.1.37:8080;",
          },
        ],
      },
    ]
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'uni003eu5.fusionsolar.huawei.com',
    },
  ],
}
export default nextConfig
