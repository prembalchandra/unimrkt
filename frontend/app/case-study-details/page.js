import CaseDetailHero from './sections/CaseDetailHero';
import CaseDetailChallenge from './sections/CaseDetailChallenge';
import CaseDetailResearchQuestion from './sections/CaseDetailResearchQuestion';
import CaseDetailApproach from './sections/CaseDetailApproach';
import CaseDetailImpact from './sections/CaseDetailImpact';
import CaseDetailFaq from './sections/CaseDetailFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, getFaqs, getCaseStudies } from '../../lib/strapi';

export const metadata = {
  title: 'Financial Services Customer Intelligence Case Study | Unimrkt Research',
  description:
    'How research uncovered evolving customer needs, digital expectations, and decision-making drivers to help a financial services organization strengthen customer strategy.',
  keywords: [
    'financial services research case study',
    'customer intelligence banking',
    'digital banking customer expectations',
    'fintech market intelligence',
    'customer retention strategy research',
  ],
  alternates: {
    canonical: '/case-study-details',
  },
  openGraph: {
    title: 'Financial Services Customer Intelligence Case Study | Unimrkt Research',
    description:
      'How research uncovered evolving customer needs, digital expectations, and decision-making drivers to help a financial services organization strengthen customer strategy.',
    url: 'https://www.unimrkt.com/case-study-details',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/uploads/case-study-banking.jpg',
        width: 1200,
        height: 630,
        alt: 'Financial Services Research Case Study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Services Customer Intelligence Case Study | Unimrkt Research',
    description:
      'How research uncovered evolving customer needs and decision-making drivers to help financial services strengthen customer strategy.',
    images: ['/uploads/case-study-banking.jpg'],
  },
};

export default async function CaseStudyDetailPage({ searchParams }) {
  const [pageData, faqs] = await Promise.all([
    getPageBySlug('case-study-details').catch(() => null),
    getFaqs().catch(() => []),
  ]);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const challengeSection = sections.find(
    (s) => s.__component === 'sections.callout-box' && (s.title?.includes('Financial Expectations') || s.kicker?.includes('CHALLENGE'))
  );
  const questionSection = sections.find(
    (s) => s.__component === 'sections.callout-box' && (s.title?.includes('Uncovering') || s.kicker?.includes('RESEARCH QUESTION'))
  );
  const editorialSection = sections.find(
    (s) => s.__component === 'sections.rich-text-block' || s.__component === 'sections.callout-box'
  );

  const approachSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions'
  );
  const impactSection = sections.find(
    (s) => s.__component === 'sections.values-grid'
  );
  const faqSection = sections.find(
    (s) => s.__component === 'sections.faq-accordion'
  );

  const displayFaqs = (faqSection?.items && faqSection.items.length > 0) ? faqSection.items : faqs.slice(0, 7);

  return (
    <>
      <CaseDetailHero dynamicHero={heroSection} />
      <CaseDetailChallenge dynamicSection={challengeSection} />
      <CaseDetailResearchQuestion dynamicSection={questionSection} />
      <CaseDetailApproach
        approachSteps={approachSection?.cards || []}
        heading={approachSection?.heading}
        description={approachSection?.description}
      />
      <CaseDetailImpact
        impacts={impactSection?.values || []}
        kicker={impactSection?.kicker}
        heading={impactSection?.heading}
        description={impactSection?.description}
      />
      <CaseDetailFaq faqs={displayFaqs} />
      <InsightsEditorial
        kicker={editorialSection?.kicker}
        title={editorialSection?.heading || editorialSection?.title}
        paragraph1={editorialSection?.description}
      />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
