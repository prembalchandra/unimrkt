import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import TelephonicHero from './sections/TelephonicHero';
import ResearchImpact from './sections/ResearchImpact';
import TelephonicOverview from './sections/TelephonicOverview';
import WhyTelephonic from './sections/WhyTelephonic';
import TelephonicCanMeasure from './sections/TelephonicCanMeasure';
import TelephonicProcess from './sections/TelephonicProcess';
import MeasureSection from './sections/MeasureSection';
import QualityFirst from './sections/QualityFirst';
import CommonBlogSection from '../../components/CommonBlogSection';
import TelephonicFaq from './sections/TelephonicFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'telephonic-surveys',
    'CATI Telephonic Surveys | 500+ Multi-Language Workstations',
    '500+ computerized assisted telephone interviewing (CATI) workstations operating globally across 22+ languages with real-time audio auditing and ISO QA standards.'
  );
}

export default async function TelephonicSurveysPage() {
  const pageData = await getPageBySlug('telephonic-surveys').catch(() => null);

  
  // Preserved full page design wired directly to Strapi DB dynamic sections

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

    const faqSection = findSection(pageData, 'sections.faq-accordion');
  return (
    <>
      <TelephonicHero dynamicHero={heroSection} />
      <ResearchImpact />
      <TelephonicOverview />
      <WhyTelephonic />
      <TelephonicProcess />
      <TelephonicCanMeasure />
      <QualityFirst />
      <MeasureSection />
      <CommonBlogSection />
      <TelephonicFaq dynamicFaq={faqSection} />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
