import React from 'react';
import FaqHero from './sections/FaqHero';
import FaqContent from './sections/FaqContent';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | Unimrkt Research',
  description:
    'Find answers to common questions about Unimrkt Research services, CATI workstations, CAWI online panels, fieldwork validation, timelines, and data quality controls.',
  keywords: [
    'market research FAQ',
    'CATI survey questions',
    'research methodology FAQ',
    'unimrkt quality assurance',
    'survey turnaround times',
    'research compliance FAQ',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Unimrkt Research',
    description:
      'Find answers to frequently asked questions about Unimrkt Research, CATI surveys, primary and secondary research, and quality standards.',
    url: 'https://www.unimrkt.com/faq',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/faq-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions (FAQ) | Unimrkt Research',
    description:
      'Find answers to frequently asked questions about Unimrkt Research, CATI surveys, primary and secondary research, and quality standards.',
    images: ['/asstes/images/faq-hero-banner-img.png'],
  },
};

export default async function FaqPage() {
  const pageData = await getPageBySlug('faq').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <FaqHero dynamicHero={heroSection} />
      <FaqContent dynamicFaq={faqSection} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
