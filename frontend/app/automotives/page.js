import React from 'react';
import AutomotiveHero from './sections/AutomotiveHero';
import AutomotiveAboutOverview from './sections/AutomotiveAboutOverview';
import AutomotiveIntelligenceCards from './sections/AutomotiveIntelligenceCards';
import AutomotiveEcosystemSlider from './sections/AutomotiveEcosystemSlider';
import AutomotiveChallengesDark from './sections/AutomotiveChallengesDark';
import AutomotiveSegmentsSlider from './sections/AutomotiveSegmentsSlider';
import AutomotiveMethodologiesSlider from './sections/AutomotiveMethodologiesSlider';
import ContactFormSection from '../primary-research/sections/ContactFormSection';
import CommonBlogSection from '../../components/CommonBlogSection';
import AutomotiveFaq from './sections/AutomotiveFaq';
import AutomotiveEmpowerCta from './sections/AutomotiveEmpowerCta';
import AutomotiveOverview from './sections/AutomotiveOverview';
import AutomotiveEditorialabout from './sections/AutomotiveEditorialabout';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Automotive & Smart Mobility Market Research | EV & Fleet Insights',
  description:
    'Accelerate mobility innovation with deep automotive insights into EV adoption, connected cockpits, autonomous driving, commercial fleets, and dealer networks.',
  keywords: [
    'automotive market research',
    'electric vehicle research',
    'smart mobility insights',
    'fleet management research',
    'connected vehicle technology',
    'automotive consumer trends',
    'OEM market research',
  ],
  alternates: {
    canonical: '/automotives',
  },
  openGraph: {
    title: 'Automotive & Smart Mobility Market Research | Unimrkt Research',
    description:
      'Comprehensive automotive market research covering EV transition, connected cockpits, commercial fleets, and dealership experiences.',
    url: 'https://www.unimrkt.com/automotives',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/case-study-automotive.webp',
        width: 1200,
        height: 630,
        alt: 'Automotive & Smart Mobility Market Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automotive & Smart Mobility Market Research | Unimrkt Research',
    description:
      'Comprehensive automotive market research covering EV transition, connected cockpits, commercial fleets, and dealership experiences.',
    images: ['/asstes/images/case-study-automotive.webp'],
  },
};

export default async function AutomotivesPage() {
  const pageData = await getPageBySlug('automotives').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <AutomotiveHero dynamicHero={heroSection} />
      <AutomotiveAboutOverview />
      <AutomotiveIntelligenceCards />
      <AutomotiveEcosystemSlider />
      <AutomotiveChallengesDark />
      <AutomotiveSegmentsSlider />
      <AutomotiveMethodologiesSlider />
      <AutomotiveEmpowerCta />
      <ContactFormSection />
      <CommonBlogSection />
      <AutomotiveFaq />
      <AutomotiveOverview />
      <AutomotiveEditorialabout />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
