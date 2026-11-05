import React from 'react';
import ServicesHero from './sections/ServicesHero';
import ServicesBreadcrumb from './sections/ServicesBreadcrumb';
import ServicesList from './sections/ServicesList';
import ServicesWorkflow from './sections/ServicesWorkflow';
import WhyChooseUs from './sections/WhyChooseUs';
import ServicesFaq from './sections/ServicesFaq';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, getServices, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'services',
    'Market Research Services | Primary, Secondary, CATI & Analytics',
    'Comprehensive research solutions: qualitative in-depth interviews, quantitative surveys, CATI telephonic reach, survey scripting, and advanced business analytics.'
  );
}

export default async function ServicesPage() {
  const [pageData, strapiServices] = await Promise.all([
    getPageBySlug('services').catch(() => null),
    getServices(20).catch(() => []),
  ]);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <ServicesHero dynamicHero={heroSection} />
      <ServicesBreadcrumb />
      <ServicesList dynamicServices={strapiServices} />
      <ServicesWorkflow />
      <WhyChooseUs />
      <ServicesFaq dynamicFaq={faqSection} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
