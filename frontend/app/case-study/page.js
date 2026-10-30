import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import CaseStudyHero from './sections/CaseStudyHero';
import CaseStudyExplorer from './sections/CaseStudyExplorer';
import ResearchValue from './sections/ResearchValue';
import ContactProcess from './sections/ContactProcess';
import CaseStudyFaq from './sections/CaseStudyFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';

import { getCaseStudies, getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'case-study',
    'Client Case Studies & Proven Results | Unimrkt Research',
    'Explore proven client success stories demonstrating how Unimrkt Research delivers actionable data, competitive advantage, and strategic growth across industries.'
  );
}

export default async function CaseStudyPage() {
  const [strapiStudies, pageData] = await Promise.all([
    getCaseStudies(24).catch(() => []),
    getPageBySlug('case-study').catch(() => null),
  ]);

  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ caseStudies: strapiStudies, pageData }} />
      </main>
    );
  }

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
