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
import { getPageBySlug, findSection, getFaqs, getIndustries } from '../../lib/strapi';

export const metadata = {
  title: 'About Our Company | Unimrkt Research',
  description:
    'Discover Unimrkt Research: our core values, executive leadership, worldwide research reach, and dedication to data integrity and strategic market impact.',
  keywords: [
    'Unimrkt company profile',
    'market research firm',
    'global research capability',
    'market intelligence agency',
    'data integrity standards',
  ],
  alternates: {
    canonical: '/our-company',
  },
  openGraph: {
    title: 'About Our Company | Unimrkt Research',
    description:
      'Discover Unimrkt Research: our core values, executive leadership, worldwide research reach, and dedication to data integrity.',
    url: 'https://www.unimrkt.com/our-company',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/about-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Our Company - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Company | Unimrkt Research',
    description:
      'Discover Unimrkt Research: our core values, executive leadership, worldwide research reach, and dedication to data integrity.',
    images: ['/asstes/images/about-hero-banner-img.png'],
  },
};

export default async function OurCompanyPage() {
  const [pageData, faqs, industries] = await Promise.all([
    getPageBySlug('our-company').catch(() => null),
    getFaqs().catch(() => []),
    getIndustries(12).catch(() => []),
  ]);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const richTextSection = findSection(pageData, 'sections.rich-text-block');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const metricsSection = sections.find(
    (s) => s.__component === 'sections.metrics-grid' && (s.heading?.includes('Borders') || s.kicker?.includes('BORDERS'))
  ) || findSection(pageData, 'sections.metrics-grid');

  const pillarsSection = sections.find(
    (s) => s.__component === 'sections.values-grid' && s.heading?.includes('Insights That Move')
  ) || findSection(pageData, 'sections.values-grid');

  const ecosystemSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions'
  );

  const valuesSection = sections.find(
    (s) => s.__component === 'sections.research-reach' && (s.heading?.includes('Principles') || s.kicker?.includes('VALUES'))
  );

  return (
    <main>
      <CompanyHero dynamicHero={heroSection} />
      <OurcompanyResearchImpact
        stats={metricsSection?.metrics || []}
        heading={metricsSection?.heading}
      />
      <CompanyAboutSection dynamicRichText={richTextSection} />
      <CompanyOverview
        pillars={pillarsSection?.values || []}
        kicker={pillarsSection?.kicker}
        heading={pillarsSection?.heading}
        description={pillarsSection?.description}
      />
      <CompnayIndustriesUnderstand industries={industries} />
      <CompanyOurResearchEcosystem
        processSteps={ecosystemSection?.cards || []}
        kicker={ecosystemSection?.kicker}
        heading={ecosystemSection?.heading}
        description={ecosystemSection?.description}
      />
      <CompnayOurValues
        values={valuesSection?.cards || []}
        kicker={valuesSection?.kicker}
        heading={valuesSection?.heading}
        description={valuesSection?.description}
      />
      <CommonBlogSection />
      <CompnayOurFqa faqs={faqs.slice(0, 5)} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
