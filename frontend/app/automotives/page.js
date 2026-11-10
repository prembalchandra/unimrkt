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
import { getPageBySlug, findSection, getFaqs, getCaseStudies } from '../../lib/strapi';

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
        url: '/uploads/case-study-automotive.jpg',
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
    images: ['/uploads/case-study-automotive.jpg'],
  },
};

export default async function AutomotivesPage() {
  const [pageData, faqs, allStudies] = await Promise.all([
    getPageBySlug('automotives').catch(() => null),
    getFaqs().catch(() => []),
    getCaseStudies(10).catch(() => []),
  ]);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const intelSection = sections.find(
    (s) => s.__component === 'sections.research-reach' && s.heading?.includes('Intelligence')
  );
  const challengesSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions'
  );
  const ecosystemSection = sections.find(
    (s) => s.__component === 'sections.industry-slider'
  );
  const segmentsSection = sections.find(
    (s) => s.__component === 'sections.values-grid' && (s.heading?.includes('Segment') || s.kicker?.includes('WHO WE SERVE'))
  );
  const methodsSection = sections.find(
    (s) => s.__component === 'sections.research-reach' && s.heading?.includes('Methodologies')
  );
  const faqSection = sections.find(
    (s) => s.__component === 'sections.faq-accordion'
  );

  // Filter or take automotive case studies
  const automotiveStudies = allStudies.filter(
    (s) => s.industry?.slug === 'automotives' || s.title?.toLowerCase().includes('vehicle') || s.title?.toLowerCase().includes('fleet')
  );
  const displayStudies = automotiveStudies.length > 0 ? automotiveStudies.slice(0, 2) : allStudies.slice(0, 2);

  // FAQs
  const displayFaqs = (faqSection?.items && faqSection.items.length > 0) ? faqSection.items : faqs.slice(0, 6);

  const overviewSection = sections.find((s) => s.__component === 'sections.callout-box');
  const empowerCtaSection = sections.find(
    (s) => s.__component === 'sections.question-cta' && s.title?.includes('Empower')
  ) || ctaSection;
  const contactFormSection = sections.find((s) => s.__component === 'sections.contact-form');

  return (
    <>
      <AutomotiveHero dynamicHero={heroSection} />
      <AutomotiveAboutOverview dynamicOverview={overviewSection} />
      <AutomotiveIntelligenceCards
        cards={intelSection?.cards || []}
        heading={intelSection?.heading}
        kicker={intelSection?.kicker}
      />
      <AutomotiveEcosystemSlider
        slides={ecosystemSection?.slides || []}
        heading={ecosystemSection?.heading}
        kicker={ecosystemSection?.kicker}
      />
      <AutomotiveChallengesDark
        challenges={challengesSection?.cards || []}
        heading={challengesSection?.heading}
        kicker={challengesSection?.kicker}
        description={challengesSection?.description}
      />
      <AutomotiveSegmentsSlider
        segments={segmentsSection?.values || []}
        heading={segmentsSection?.heading}
        kicker={segmentsSection?.kicker}
      />
      <AutomotiveMethodologiesSlider
        methodologies={methodsSection?.cards || []}
        heading={methodsSection?.heading}
        kicker={methodsSection?.kicker}
        description={methodsSection?.description}
      />
      <AutomotiveEmpowerCta dynamicCta={empowerCtaSection} />
      <ContactFormSection dynamicForm={contactFormSection} />
      <CommonBlogSection />
      <AutomotiveFaq faqs={displayFaqs} />
      <AutomotiveOverview caseStudies={displayStudies} />
      <AutomotiveEditorialabout />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
