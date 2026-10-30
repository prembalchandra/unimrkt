import React from 'react';
import HeroSection from './homesections/HeroSection';
import GlobalResearchSection from './homesections/GlobalResearchSection';
import SolutionsSection from './homesections/SolutionsSection';
import CapabilitiesSection from './homesections/CapabilitiesSection';
import AdvancedAreaSection from './homesections/AdvancedAreaSection';
import IndustriesSection from './homesections/IndustriesSection';
import MarketplacesSection from './homesections/MarketplacesSection';
import MomentsSection from './homesections/MomentsSection';
import HomeFaq from './homesections/HomeFaq';
import HomeInsightsEditorial from './homesections/HomeInsightsEditorial';
import HomeresearchCta from './homesections/HomeresearchCta';
import { getBlogPosts, getPageBySlug, findSection, getIndustries, getServices } from '../lib/strapi';

export const metadata = {
  title: 'Unimrkt Research | Structured Market Intelligence & Global Solutions',
  description:
    'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities across 90+ countries.',
  keywords: [
    'market intelligence',
    'global market research',
    'CATI telephone surveys',
    'qualitative research',
    'quantitative research',
    'primary market research',
    'B2B research partner',
    'consumer insights',
    'Unimrkt Research',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Unimrkt Research | Structured Market Intelligence & Global Solutions',
    description:
      'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    url: 'https://www.unimrkt.com',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/unimrkt-resarch-map-banner-img.webp',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research - Global Market Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unimrkt Research | Structured Market Intelligence & Global Solutions',
    description:
      'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    images: ['/asstes/images/unimrkt-resarch-map-banner-img.webp'],
  },
};

export default async function HomePage() {
  const [pageData, latestBlogs, industries, services] = await Promise.all([
    getPageBySlug('home').catch(() => null),
    getBlogPosts(6).catch(() => []),
    getIndustries(12).catch(() => []),
    getServices(12).catch(() => []),
  ]);

  const homeHero = findSection(pageData, 'sections.home-hero');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <HeroSection dynamicData={homeHero} />
      <GlobalResearchSection dynamicData={metricsSection} />
      <SolutionsSection dynamicServices={services} />
      <CapabilitiesSection />
      <AdvancedAreaSection />
      <IndustriesSection dynamicIndustries={industries} />
      <MarketplacesSection />
      <MomentsSection />
      <HomeFaq dynamicFaq={faqSection} />
      <HomeInsightsEditorial />
      <HomeresearchCta dynamicCta={ctaSection} />
    </>
  );
}
