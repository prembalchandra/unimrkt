import React from 'react';
import IndustriesHero from './sections/IndustriesHero';
import IndustriesAbout from './sections/IndustriesAbout';
import IndustriesGrid from './sections/IndustriesGrid';
import PartnerIndustriesSection from './sections/PartnerIndustriesSection';
import QuestionsToInsightsSection from './sections/QuestionsToInsightsSection';
import QuestionCTA from './sections/QuestionCTA';
import BusinessOutcomesSection from './sections/BusinessOutcomesSection';
import LocalInsightGlobalReach from './sections/LocalInsightGlobalReach';
import ResearchProcessImpact from './sections/ResearchProcessImpact';
import CommonTrustedPartnersTestimonials from '../../components/CommonTrustedPartnersTestimonials';
import CommonBlogSection from '../../components/CommonBlogSection';
import IndustriesFaq from './sections/IndustriesFaq';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, getIndustries, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Industries We Serve | Healthcare, BFSI, Retail, Auto, Tech',
  description:
    'Tailored industry research solutions across Healthcare & Life Sciences, Banking & Financial Services, Retail & FMCG, Automotive & Mobility, and Technology & Telecom.',
  keywords: [
    'healthcare market research',
    'financial services research',
    'retail FMCG market research',
    'automotive market intelligence',
    'technology telecom research',
    'industry verticals research',
  ],
  alternates: {
    canonical: '/industries',
  },
  openGraph: {
    title: 'Industries We Serve | Unimrkt Research',
    description:
      'Uncovering evolving market trends, consumer behavior, and competitive insights across major global industry sectors.',
    url: 'https://www.unimrkt.com/industries',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/industries-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Industries We Serve - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | Unimrkt Research',
    description:
      'Uncovering evolving market trends, consumer behavior, and competitive insights across major global industry sectors.',
    images: ['/asstes/images/industries-hero-banner-img.png'],
  },
};

export default async function IndustriesPage() {
  const [pageData, strapiIndustries] = await Promise.all([
    getPageBySlug('industries').catch(() => null),
    getIndustries(24).catch(() => []),
  ]);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <IndustriesHero dynamicHero={heroSection} />
      <IndustriesAbout />
      <IndustriesGrid initialIndustries={strapiIndustries} />
      <PartnerIndustriesSection />
      <QuestionCTA dynamicCta={ctaSection} />
      <QuestionsToInsightsSection />
      <BusinessOutcomesSection />
      <LocalInsightGlobalReach />
      <ResearchProcessImpact />
      <CommonTrustedPartnersTestimonials />
      <CommonBlogSection />
      <IndustriesFaq />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
