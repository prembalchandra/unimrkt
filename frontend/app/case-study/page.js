import CaseStudyHero from './sections/CaseStudyHero';
import CaseStudyExplorer from './sections/CaseStudyExplorer';
import ResearchValue from './sections/ResearchValue';
import ContactProcess from './sections/ContactProcess';
import CaseStudyFaq from './sections/CaseStudyFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';

import { getCaseStudies, getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Client Case Studies & Proven Results | Unimrkt Research',
  description:
    'Discover how Unimrkt Research delivers measurable business impact across automotive, healthcare, finance, tech, and retail through tailored market intelligence.',
  keywords: [
    'market research case studies',
    'B2B research success stories',
    'consumer research case study',
    'healthcare research case study',
    'automotive research results',
    'business intelligence ROI',
  ],
  alternates: {
    canonical: '/case-study',
  },
  openGraph: {
    title: 'Client Case Studies & Proven Results | Unimrkt Research',
    description:
      'Real-world case studies demonstrating how our structured market research solutions solve complex challenges and drive growth.',
    url: 'https://www.unimrkt.com/case-study',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/case-study-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Case Studies & Proven Results | Unimrkt Research',
    description:
      'Real-world case studies demonstrating how our structured market research solutions solve complex challenges and drive growth.',
    images: ['/asstes/images/case-study-hero-banner-img.png'],
  },
};

export default async function CaseStudyPage() {
  const [strapiStudies, pageData] = await Promise.all([
    getCaseStudies(24).catch(() => []),
    getPageBySlug('case-study').catch(() => null),
  ]);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <CaseStudyHero dynamicHero={heroSection} />
      <CaseStudyExplorer initialCaseStudies={strapiStudies} />
      <ResearchValue />
      <ContactProcess />
      <CaseStudyFaq />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
