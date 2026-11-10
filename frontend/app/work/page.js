import WorkHero from './sections/WorkHero';
import CareerValues from './sections/CareerValues';
import CareerBenefits from './sections/CareerBenefits';
import CareerOpenings from './sections/CareerOpenings';
import CareerJourney from './sections/CareerJourney';
import CareerJoin from './sections/CareerJoin';
import WorkFaq from './sections/WorkFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSections, getCareerJobs } from '../../lib/strapi';

export const metadata = {
  title: 'Careers & Job Openings in Market Research | Unimrkt Research',
  description:
    'Join Unimrkt Research. Explore open job opportunities in primary research, CATI operations, data analytics, client servicing, and global project management.',
  keywords: [
    'market research careers',
    'jobs at unimrkt',
    'research associate jobs',
    'CATI interviewer jobs',
    'data analyst careers',
    'market research recruitment',
    'work in market research',
  ],
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Careers & Job Openings in Market Research | Unimrkt Research',
    description:
      'At Unimrkt, we give our employees a space to learn, grow and innovate. Explore open career opportunities in market research.',
    url: 'https://www.unimrkt.com/work',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/uploads/work-with-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Careers at Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers & Job Openings in Market Research | Unimrkt Research',
    description:
      'At Unimrkt, we give our employees a space to learn, grow and innovate. Explore open career opportunities in market research.',
    images: ['/uploads/work-with-hero-banner-img.png'],
  },
};

export default async function WorkPage() {
  const [pageData, careerJobs] = await Promise.all([
    getPageBySlug('work').catch(() => null),
    getCareerJobs().catch(() => []),
  ]);

  const sections = pageData?.sections || [];
  const heroSection = sections.find((s) => s.__component === 'sections.hero-common');
  const valuesGrids = findSections(pageData, 'sections.values-grid');
  const valuesSection = valuesGrids[0] || null;
  const benefitsSection = valuesGrids[1] || null;
  const journeySection = valuesGrids[2] || null;
  const faqSection = sections.find((s) => s.__component === 'sections.faq-accordion');
  const ctaSection = sections.find((s) => s.__component === 'sections.question-cta');

  const openingsSection = sections.find(
    (s) => s.__component === 'sections.callout-box' && (s.title?.includes('Opportunity') || s.kicker?.includes('Open Positions'))
  );
  const fraudSection = sections.find(
    (s) => s.__component === 'sections.callout-box' && (s.title?.includes('Fraud') || s.kicker?.includes('IMPORTANT NOTICE'))
  );
  const editorialSection = sections.find(
    (s) => s.__component === 'sections.rich-text-block' || s.__component === 'sections.callout-box'
  );

  return (
    <>
      <WorkHero dynamicHero={heroSection} />
      <CareerValues dynamicValues={valuesSection} />
      <CareerBenefits dynamicBenefits={benefitsSection} />
      <CareerOpenings initialJobs={careerJobs} dynamicSection={openingsSection} />
      <CareerJourney dynamicJourney={journeySection} />
      <CareerJoin dynamicSection={fraudSection} />
      <WorkFaq dynamicFaq={faqSection} />
      <InsightsEditorial
        kicker={editorialSection?.kicker}
        title={editorialSection?.heading || editorialSection?.title}
        paragraph1={editorialSection?.description}
      />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
