export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/404', '/api/'],
    },
    sitemap: 'https://www.unimrkt.com/sitemap.xml',
  };
}
