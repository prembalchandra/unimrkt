export default async function sitemap() {
  const baseUrl = 'https://www.unimrkt.com';

  const staticRoutes = [
    '',
    '/about',
    '/our-company',
    '/services',
    '/primary-research',
    '/telephonic-surveys',
    '/industries',
    '/automotives',
    '/case-study',
    '/case-study-details',
    '/blog',
    '/blog-details',
    '/contact',
    '/faq',
    '/gallery',
    '/team',
    '/work',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/services') || route.startsWith('/industries') ? 0.9 : 0.8,
  }));

  return staticRoutes;
}
