import WorkHero from './sections/WorkHero';
import CareerValues from './sections/CareerValues';
import CareerBenefits from './sections/CareerBenefits';
import CareerOpenings from './sections/CareerOpenings';
import CareerJourney from './sections/CareerJourney';
import CareerJoin from './sections/CareerJoin';
import WorkFaq from './sections/WorkFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

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
        url: '/asstes/images/work-with-hero-banner-img.png',
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
    images: ['/asstes/images/work-with-hero-banner-img.png'],
  },
};

export default async function WorkPage() {
  const pageData = await getPageBySlug('work').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const valuesSection = findSection(pageData, 'sections.values-grid');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <WorkHero dynamicHero={heroSection} />
      <CareerValues dynamicValues={valuesSection} />
      <CareerBenefits />
      <CareerOpenings />
      <CareerJourney />
      <CareerJoin />
      <WorkFaq />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
