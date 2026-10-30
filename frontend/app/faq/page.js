import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import FaqHero from './sections/FaqHero';
import FaqContent from './sections/FaqContent';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'faq',
    'Frequently Asked Questions (FAQ) | Unimrkt Research',
    'Find answers to common questions about our research methodologies, CATI capacity, data validation, respondent privacy, global coverage, and deliverables.'
  );
}

export default async function FaqPage() {
  const pageData = await getPageBySlug('faq').catch(() => null);

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

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
