import React from 'react';
import AboutHero from './sections/AboutHero';
import AboutOverview from './sections/AboutOverview';
import ResearchReachSection from '../services/sections/ResearchReachSection';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'About Us | Unimrkt Research',
  description:
    'Learn about Unimrkt Research, our history since 2009, global footprint across 90+ countries, 500+ CATI workstations, and ISO 20252 certified research standards.',
  keywords: [
    'about unimrkt research',
    'market research company history',
    'global research footprint',
    'ISO certified market research',
    'market research methodology',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Unimrkt Research',
    description:
      'Learn about Unimrkt Research, our history since 2009, global footprint across 90+ countries, and ISO-certified research standards.',
    url: 'https://www.unimrkt.com/about',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/about-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'About Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Unimrkt Research',
    description:
      'Learn about Unimrkt Research, our history since 2009, global footprint across 90+ countries, and ISO-certified research standards.',
    images: ['/asstes/images/about-hero-banner-img.png'],
  },
};

export default async function AboutPage() {
  const pageData = await getPageBySlug('about').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const valuesSection = findSection(pageData, 'sections.values-grid');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <AboutHero dynamicHero={heroSection} />
      <AboutOverview dynamicMetrics={metricsSection} dynamicValues={valuesSection} />
      <ResearchReachSection />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
