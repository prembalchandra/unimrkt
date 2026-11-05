import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
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
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'automotives',
    'Automotive & Smart Mobility Market Research | EV & Fleet Insights',
    'Strategic intelligence across electric vehicles, autonomous driving systems, fleet management, connected mobility, and automotive OEM supplier ecosystems.'
  );
}

export default async function AutomotivesPage() {
  const pageData = await getPageBySlug('automotives').catch(() => null);

  
  // Preserved full page design wired directly to Strapi DB dynamic sections

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

    const faqSection = findSection(pageData, 'sections.faq-accordion');
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
      <AutomotiveFaq dynamicFaq={faqSection} />
      <AutomotiveOverview />
      <AutomotiveEditorialabout />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
