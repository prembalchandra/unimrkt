import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import AboutHero from './sections/AboutHero';
import AboutOverview from './sections/AboutOverview';
import ResearchReachSection from '../services/sections/ResearchReachSection';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'about',
    'About Us | Global Footprint & Methodology | Unimrkt Research',
    'Learn about Unimrkt Research, our history since 2009, global footprint across 90+ countries, 500+ CATI workstations, and ISO 20252 certified research standards.'
  );
}

export default async function AboutPage() {
  const pageData = await getPageBySlug('about').catch(() => null);

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const valuesSection = findSection(pageData, 'sections.values-grid');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <AboutHero dynamicHero={heroSection} />
      <AboutOverview dynamicMetrics={metricsSection} dynamicValues={valuesSection} />
      <ResearchReachSection />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
