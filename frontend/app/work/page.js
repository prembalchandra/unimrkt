import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import WorkHero from './sections/WorkHero';
import CareerValues from './sections/CareerValues';
import CareerBenefits from './sections/CareerBenefits';
import CareerOpenings from './sections/CareerOpenings';
import CareerJourney from './sections/CareerJourney';
import CareerJoin from './sections/CareerJoin';
import WorkFaq from './sections/WorkFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, getCareerJobs, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'work',
    'Careers & Job Openings in Market Research | Unimrkt Research',
    'Explore exciting career opportunities in market research, data analysis, CATI operations, and client consulting with a fast-growing global market intelligence firm.'
  );
}

export default async function WorkPage() {
  const [pageData, careerJobs] = await Promise.all([
    getPageBySlug('work').catch(() => null),
    getCareerJobs(20).catch(() => []),
  ]);

  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ jobs: careerJobs, pageData }} />
      </main>
    );
  }

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
