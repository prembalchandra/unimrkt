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
import { getPageBySlug, findSection } from '../../lib/strapi';

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
  const pageData = await getPageBySlug('our-company').catch(() => null);

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
