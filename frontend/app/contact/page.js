import React from 'react';
import ContactHero from './sections/ContactHero';
import ResearchImpact from './sections/ResearchImpact';
import OfficePresence from './sections/OfficePresence';
import ResearchValue from './sections/ResearchValue';
import ContactProcess from './sections/ContactProcess';
import ContactForm from './sections/ContactForm';
import ContactFaq from './sections/ContactFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'contact',
    'Contact Us | Global Research Offices in India, USA & UK',
    'Get in touch with our global research consulting teams in India, USA, and worldwide. Request a research proposal, schedule a consultation, or ask questions.'
  );
}

export default async function ContactPage() {
  const pageData = await getPageBySlug('contact').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const valuesSection = findSection(pageData, 'sections.values-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const richTextSection = findSection(pageData, 'sections.rich-text-block');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <ContactHero dynamicHero={heroSection} />
      <ResearchImpact dynamicMetrics={metricsSection} />
      <OfficePresence />
      <ResearchValue dynamicValues={valuesSection} />
      <ContactProcess />
      <ContactForm />
      <ContactFaq dynamicFaq={faqSection} />
      <InsightsEditorial dynamicData={richTextSection} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
