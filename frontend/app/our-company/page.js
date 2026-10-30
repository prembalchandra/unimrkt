import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import CompanyHero from './sections/CompanyHero';
import OurcompanyResearchImpact from './sections/OurcompanyResearchImpact';
import CompanyAboutSection from './sections/CompanyAboutSection';
import CompanyOverview from './sections/CompanyOverview';
import CompnayIndustriesUnderstand from './sections/CompnayIndustriesUnderstand';
import CompanyOurResearchEcosystem from './sections/CompanyOurResearchEcosystem';
import CompnayOurValues from './sections/CompnayOurValues';
import CommonBlogSection from '../../components/CommonBlogSection';
import CompnayOurFqa from './sections/CompnayOurFqa';
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

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const richTextSection = findSection(pageData, 'sections.rich-text-block');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <CompanyHero dynamicHero={heroSection} />
      <OurcompanyResearchImpact />
      <CompanyAboutSection dynamicRichText={richTextSection} />
      <CompanyOverview />
      <CompnayIndustriesUnderstand />
      <CompanyOurResearchEcosystem />
      <CompnayOurValues />
      <CommonBlogSection />
      <CompnayOurFqa />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
