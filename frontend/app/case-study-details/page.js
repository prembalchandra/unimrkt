import CaseDetailHero from './sections/CaseDetailHero';
import CaseDetailChallenge from './sections/CaseDetailChallenge';
import CaseDetailResearchQuestion from './sections/CaseDetailResearchQuestion';
import CaseDetailApproach from './sections/CaseDetailApproach';
import CaseDetailImpact from './sections/CaseDetailImpact';
import CaseDetailFaq from './sections/CaseDetailFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

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
        url: '/asstes/images/case-study-banking.jpg',
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
    images: ['/asstes/images/case-study-banking.jpg'],
  },
};

export default async function CaseStudyDetailPage() {
  const pageData = await getPageBySlug('case-study-details').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <CaseDetailHero dynamicHero={heroSection} />
      <CaseDetailChallenge />
      <CaseDetailResearchQuestion />
      <CaseDetailApproach />
      <CaseDetailImpact />
      <CaseDetailFaq />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
