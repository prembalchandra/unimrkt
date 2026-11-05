import React from 'react';
import CompanyHero from './sections/CompanyHero';
import CompanyBreadcrumb from './sections/CompanyBreadcrumb';
import OurcompanyResearchImpact from './sections/OurcompanyResearchImpact';
import CompanyAboutSection from './sections/CompanyAboutSection';
import CompanyOverview from './sections/CompanyOverview';
import CompanyOurResearchEcosystem from './sections/CompanyOurResearchEcosystem';
import CompnayOurValues from './sections/CompnayOurValues';
import CompnayIndustriesUnderstand from './sections/CompnayIndustriesUnderstand';
import CommonBlogSection from '../../components/CommonBlogSection';
import CompnayOurFqa from './sections/CompnayOurFqa';
import CompanyEditorial from './sections/CompanyEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'our-company',
    'Our Company | Trusted Market Research Partner | Unimrkt Research',
    'Discover our journey, mission, executive leadership, and multi-market research operations empowering multinational brands with validated intelligence.'
  );
}

export default async function OurCompanyPage() {
  const pageData = await getPageBySlug('our-company').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const richTextSection = findSection(pageData, 'sections.rich-text-block');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <CompanyHero dynamicHero={heroSection} />
      <CompanyBreadcrumb />
      <OurcompanyResearchImpact dynamicMetrics={metricsSection} />
      <CompanyAboutSection dynamicRichText={richTextSection} />
      <CompanyOverview />
      <CompanyOurResearchEcosystem />
      <CompnayOurValues />
      <CompnayIndustriesUnderstand />
      <CommonBlogSection />
      <CompnayOurFqa dynamicFaq={faqSection} />
      <CompanyEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
