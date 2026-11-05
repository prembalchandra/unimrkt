import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import CaseDetailHero from './sections/CaseDetailHero';
import CaseDetailChallenge from './sections/CaseDetailChallenge';
import CaseDetailResearchQuestion from './sections/CaseDetailResearchQuestion';
import CaseDetailApproach from './sections/CaseDetailApproach';
import CaseDetailImpact from './sections/CaseDetailImpact';
import CaseDetailFaq from './sections/CaseDetailFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'case-study-details',
    'Case Study In-Depth Analysis | Methodology & Business Outcomes',
    'Detailed breakdown of research objectives, cross-market methodology, data validation frameworks, and tangible business results achieved for enterprise clients.'
  );
}

export default async function CaseStudyDetailPage() {
  const pageData = await getPageBySlug('case-study-details').catch(() => null);

  
  // Preserved full page design wired directly to Strapi DB dynamic sections

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
