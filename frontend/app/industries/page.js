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
        url: '/asstes/images/industries-hero-banner-img.png',
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
    images: ['/asstes/images/industries-hero-banner-img.png'],
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

  const reachSection = sections.find(
    (s) => s.__component === 'sections.metrics-grid' && (s.heading?.includes('Local Insight') || s.kicker?.includes('Beyond'))
  );
  const outcomesSection = sections.find(
    (s) => s.__component === 'sections.values-grid' && (s.heading?.includes('Business Forward') || s.kicker?.includes('OUTCOMES'))
  );
  const partnerSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Partner')
  );
  const questionsSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Questions')
  );
  const processSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && (s.heading?.includes('Structured Research') || s.heading?.includes('Process'))
  );
  const faqSection = findSection(pageData, 'sections.faq-accordion');

  const displayFaqs = (faqSection?.items && faqSection.items.length > 0) ? faqSection.items : faqs.slice(0, 6);

  const overviewSection = sections.find(
    (s) => s.__component === 'sections.callout-box' && (s.title?.includes('One Research Partner') || s.kicker?.includes('About Our Services'))
  );
  const gridSection = sections.find(
    (s) => s.__component === 'sections.callout-box' && (s.title?.includes('Expertise Across') || s.kicker?.includes('Industries We Serve'))
  );

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
      />
      <QuestionCTA dynamicCta={ctaSection} />
      <QuestionsToInsightsSection
        items={questionsSection?.cards || partnerSection?.cards || []}
        dynamicSection={questionsSection}
      />
      <BusinessOutcomesSection
        outcomes={outcomesSection?.values || []}
        kicker={outcomesSection?.kicker}
        heading={outcomesSection?.heading}
        description={outcomesSection?.description}
      />
      <LocalInsightGlobalReach
        stats={reachSection?.metrics || []}
        kicker={reachSection?.kicker}
        heading={reachSection?.heading}
        description={reachSection?.description}
      />
      <ResearchProcessImpact
        steps={processSection?.cards || []}
        kicker={processSection?.kicker}
        heading={processSection?.heading}
        description={processSection?.description}
      />
      <CommonTrustedPartnersTestimonials />
      <CommonBlogSection />
      <IndustriesFaq faqs={displayFaqs} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
