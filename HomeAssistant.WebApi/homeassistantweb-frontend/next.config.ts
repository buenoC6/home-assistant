import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' data: https://uni003eu5.fusionsolar.huawei.com; " +
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
              "base-uri 'none'; " +
              "form-action 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
              "font-src 'self' fonts.gstatic.com; " +
              "manifest-src 'self'; " +
              "img-src 'self' blob: https://uni003eu5.fusionsolar.huawei.com data:; " +
              "connect-src 'self' 'unsafe-inline' 'unsafe-eval' data: http://192.168.1.37:8080 http://192.168.1.37:8080/api/network/onduleur;",
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
