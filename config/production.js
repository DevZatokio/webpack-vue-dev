/**
 * Production stage configuration.
 *
 * @module config/production
 */

module.exports = {
  bundleAnalyzerReport: false,
  serviceWorker: false,
  extractCss: false,
  sourceMaps: false,
  optimization: {
    minimize: true,
    chunkIds: 'named'
  },

  uglify: {
    warnings: false
  },

  headers: {
    'strict-transport-security': ['max-age=31536000', 'includeSubDomains', 'preload'].join(';'),
    'x-xss-protection': ['1', 'mode=block'].join(';'),
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'same-origin',
    'x-frame-options': 'deny',
    'content-security-policy': [
      `img-src 'self' data: blob: *.cloudfront.net *.google.com https://unpkg.com *.googleapis.com *.gstatic.com *.facebook.com https://s3.amazonaws.com/sharethis-socialab-prod/share-this-logo%402x.png`,
      `connect-src 'self' *.firebaseio.com https://*.googleapis.com  wss://realtime.ably.io *.ably.io *.cloudfront.net *.sharethis.com wss://localhost:* localhost:* ws: *.amazonaws.com *.facebook.com wss://chats.mejormunicipio.com/*/*  ws://chats.mejormunicipio.com ws: *.mejormunicipio.com http://chats.mejormunicipio.com`,
      `script-src 'self' 'nonce-2726c7f26c' *.gruveo.com *.sharethis.com https://www.gstatic.com https://apis.google.com cdnjs.cloudflare.com *.googleapis.com *.facebook.net *.facebook.com stackpath.bootstrapcdn.com code.jquery.com`,
      `style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com *.googleapis.com stackpath.bootstrapcdn.com`,
      `font-src data: cdnjs.cloudflare.com *.gstatic.com stackpath.bootstrapcdn.com`,
      `frame-src *.gruveo.com *.facebook.com`,
      `manifest-src 'self'`,
      `object-src 'self'`,
      `media-src 'self' *.cloudfront.net`,
      `default-src 'self' *.cloudfront.net`
    ].join(';')
  },
  app: {
    name: "Gobcity.com - Hacemos ciudades imparables",
    short: "Gobcity",
    description: "Gobcity.com es un software con herramientas en tiempo real creado para transformar las ciudades en Smart Cities.",
    domain: "Gobcity.com",
    subdomain: "gobiernos",
    home: "https://gobcity.com",
    display: "standalone",
    background: "#f6f6f6",
    color: "#2ca089",
    ogImage: "https://gobcity.com/static/share/facebook.png"
  }
};
