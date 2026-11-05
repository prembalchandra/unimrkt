import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
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
import { getPageBySlug, getIndustries, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'industries',
    'Industries We Serve | Healthcare, BFSI, Retail, Auto, Tech',
    'Market intelligence tailored for Automotive, Healthcare, Technology, BFSI, Retail, Energy, FMCG, and Industrial Manufacturing sectors across global regions.'
  );
}

export default async function IndustriesPage() {
  const [pageData, strapiIndustries] = await Promise.all([
    getPageBySlug('industries').catch(() => null),
    getIndustries(24).catch(() => []),
  ]);

  
  // Preserved full page design wired directly to Strapi DB dynamic sections

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

    const faqSection = findSection(pageData, 'sections.faq-accordion');
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
      <IndustriesFaq dynamicFaq={faqSection} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
