import React from 'react';
import GalleryHero from './sections/GalleryHero';
import GalleryGrid from './sections/GalleryGrid';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Our Moments & Culture Gallery | Unimrkt Research',
  description:
    'Explore the Unimrkt Research gallery: research activities, team collaborations, corporate events, milestone celebrations, and our vibrant global workspace culture.',
  keywords: [
    'unimrkt gallery',
    'market research team culture',
    'corporate events unimrkt',
    'life at unimrkt',
    'research moments and milestones',
  ],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Our Moments & Culture Gallery | Unimrkt Research',
    description:
      'Explore the Unimrkt Research gallery to discover our research activities, events, team moments, and corporate highlights.',
    url: 'https://www.unimrkt.com/gallery',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/gallery-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Moments & Culture Gallery | Unimrkt Research',
    description:
      'Explore the Unimrkt Research gallery to discover our research activities, events, team moments, and corporate highlights.',
    images: ['/asstes/images/gallery-banner-img.png'],
  },
};

export default async function GalleryPage() {
  const pageData = await getPageBySlug('gallery').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <GalleryHero dynamicHero={heroSection} />
      <GalleryGrid />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
