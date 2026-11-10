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
import { getPageBySlug, getIndustries, getFaqs, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Industries We Serve | Healthcare, BFSI, Retail, Auto, Tech',
  description:
    'Tailored industry research solutions across Healthcare & Life Sciences, Banking & Financial Services, Retail & FMCG, Automotive & Mobility, and Technology & Telecom.',
  keywords: [
    'healthcare market research',
    'financial services research',
    'retail FMCG market research',
    'automotive market intelligence',
    'technology telecom research',
    'industry verticals research',
  ],
  alternates: {
    canonical: '/industries',
  },
  openGraph: {
    title: 'Industries We Serve | Unimrkt Research',
    description:
      'Uncovering evolving market trends, consumer behavior, and competitive insights across major global industry sectors.',
    url: 'https://www.unimrkt.com/industries',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/uploads/industries-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Industries We Serve - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | Unimrkt Research',
    description:
      'Uncovering evolving market trends, consumer behavior, and competitive insights across major global industry sectors.',
    images: ['/uploads/industries-hero-banner-img.png'],
  },
};

export default async function IndustriesPage() {
  const [pageData, strapiIndustries, faqs] = await Promise.all([
    getPageBySlug('industries').catch(() => null),
    getIndustries(24).catch(() => []),
    getFaqs().catch(() => []),
  ]);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const overviewSection = sections.find(
    (s) =>
      s.__component === 'sections.callout-box' &&
      (s.title?.includes('Understanding Industries') ||
        s.kicker?.includes('Our Industries') ||
        s.title?.includes('One Research Partner') ||
        s.kicker?.includes('About Our Services'))
  );
  const gridSection = sections.find(
    (s) =>
      s.__component === 'sections.callout-box' &&
      (s.title?.includes('Deep Expertise') ||
        s.title?.includes('Expertise Across') ||
        s.kicker?.includes('EXPERTISE') ||
        s.kicker?.includes('Industries We Serve'))
  );
  const partnerSection = sections.find(
    (s) =>
      s.__component === 'sections.accordion-solutions' &&
      (s.heading?.includes('One Research Partner') ||
        s.heading?.includes('Partner') ||
        s.kicker?.includes('VERTICALS'))
  );
  const questionsSection = sections.find(
    (s) =>
      s.__component === 'sections.accordion-solutions' &&
      (s.heading?.includes('Questions To Insights') ||
        s.heading?.includes('Questions') ||
        s.kicker?.includes('UNDERSTAND'))
  );
  const outcomesSection = sections.find(
    (s) =>
      s.__component === 'sections.values-grid' &&
      (s.heading?.includes('Outcomes') ||
        s.heading?.includes('Business Forward') ||
        s.kicker?.includes('CASE STUDIES') ||
        s.kicker?.includes('OUTCOMES'))
  );
  const reachSection = sections.find(
    (s) =>
      s.__component === 'sections.metrics-grid' &&
      (s.heading?.includes('Local Insight') ||
        s.kicker?.includes('GLOBAL PRESENCE') ||
        s.kicker?.includes('Beyond'))
  );
  const processSection = sections.find(
    (s) =>
      s.heading?.includes('Turning Research Into Impact') ||
      s.heading?.includes('Impact') ||
      s.heading?.includes('Process') ||
      s.kicker?.includes('PROCESS')
  );
  const faqSection = findSection(pageData, 'sections.faq-accordion');

  const displayFaqs = (faqSection?.items && faqSection.items.length > 0) ? faqSection.items : faqs.slice(0, 6);

  return (
    <main>
      <IndustriesHero dynamicHero={heroSection} />
      <IndustriesAbout dynamicOverview={overviewSection} />
      <IndustriesGrid initialIndustries={strapiIndustries} dynamicSection={gridSection} />
      <PartnerIndustriesSection
        features={partnerSection?.cards || []}
        kicker={partnerSection?.kicker}
        heading={partnerSection?.heading}
        description={partnerSection?.description}
        dynamicSection={partnerSection}
      />
      <QuestionCTA dynamicCta={ctaSection} />
      <QuestionsToInsightsSection
        items={questionsSection?.cards || []}
        dynamicSection={questionsSection}
      />
      <BusinessOutcomesSection
        outcomes={outcomesSection?.values || []}
        kicker={outcomesSection?.kicker}
        heading={outcomesSection?.heading}
        description={outcomesSection?.description}
        dynamicSection={outcomesSection}
      />
      <LocalInsightGlobalReach
        stats={reachSection?.metrics || []}
        kicker={reachSection?.kicker}
        heading={reachSection?.heading}
        description={reachSection?.description}
        dynamicSection={reachSection}
      />
      <ResearchProcessImpact
        steps={processSection?.cards || []}
        kicker={processSection?.kicker}
        heading={processSection?.heading}
        description={processSection?.description}
        dynamicSection={processSection}
      />
      <CommonTrustedPartnersTestimonials
        kicker="CLIENT SUCCESS STORIES"
        heading="Trusted Research Partner For Businesses Worldwide"
      />
      <CommonBlogSection />
      <IndustriesFaq faqs={displayFaqs} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
