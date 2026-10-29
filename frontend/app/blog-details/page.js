import React from 'react';
import BlogDetailBreadcrumb from './sections/BlogDetailBreadcrumb';
import BlogDetailContent from './sections/BlogDetailContent';
import ResearchCta from '../blog/sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Key Trends Shaping the Future of the Automotive Industry | Unimrkt Blog',
  description:
    'Explore the key trends reshaping the automotive industry, from electrification and software-defined vehicles to connected experiences, autonomous systems, and sustainability.',
  keywords: [
    'automotive industry trends',
    'electric vehicles future',
    'software-defined vehicles',
    'connected vehicle market',
    'automotive market intelligence',
    'automotive sustainability trends',
  ],
  alternates: {
    canonical: '/blog-details',
  },
  openGraph: {
    title: 'Key Trends Shaping the Future of the Automotive Industry | Unimrkt Blog',
    description:
      'Explore the key trends reshaping the automotive industry, from electrification and software-defined vehicles to connected experiences and sustainability.',
    url: 'https://www.unimrkt.com/blog-details',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/asstes/images/blog-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Key Trends Shaping the Future of the Automotive Industry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Key Trends Shaping the Future of the Automotive Industry | Unimrkt Blog',
    description:
      'Explore the key trends reshaping the automotive industry, from electrification and software-defined vehicles to connected experiences and sustainability.',
    images: ['/asstes/images/blog-banner-img.png'],
  },
};

export default async function BlogDetailsPage() {
  const pageData = await getPageBySlug('blog-details').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <BlogDetailBreadcrumb />
      <BlogDetailContent dynamicHero={heroSection} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
