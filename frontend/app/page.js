import React from 'react';
import HeroSection from './homesections/HeroSection';
import GlobalResearchSection from './homesections/GlobalResearchSection';
import SolutionsSection from './homesections/SolutionsSection';
import CapabilitiesSection from './homesections/CapabilitiesSection';
import AdvancedAreaSection from './homesections/AdvancedAreaSection';
import IndustriesSection from './homesections/IndustriesSection';
import MarketplacesSection from './homesections/MarketplacesSection';
import MomentsSection from './homesections/MomentsSection';
import HomeBlogSection from './homesections/HomeBlogSection';
import HomeFaq from './homesections/HomeFaq';
import HomeInsightsEditorial from './homesections/HomeInsightsEditorial';
import HomeresearchCta from './homesections/HomeresearchCta';
import { getBlogPosts, getPageBySlug, findSection, getIndustries, getServices, generatePageMetadata } from '../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'home',
    'Unimrkt Research | Structured Market Intelligence & Global Solutions',
    'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities across 90+ countries.'
  );
}

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
    <main>
      <HeroSection dynamicData={homeHero} />
      <GlobalResearchSection dynamicData={metricsSection} />
      <SolutionsSection dynamicServices={services} />
      <CapabilitiesSection />
      <AdvancedAreaSection />
      <IndustriesSection dynamicIndustries={industries} />
      <MarketplacesSection />
      <MomentsSection />
      <HomeBlogSection blogs={latestBlogs} />
      <HomeFaq dynamicFaq={faqSection} />
      <HomeInsightsEditorial />
      <HomeresearchCta dynamicCta={ctaSection} />
    </main>
  );
}
