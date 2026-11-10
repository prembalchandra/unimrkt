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
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'CATI Telephonic Surveys | 500+ Multi-Language Workstations',
  description:
    'Powered by 500+ advanced CATI workstations and native speakers in 22+ languages, Unimrkt delivers verified, high-volume telephone interviewing across 90+ global markets.',
  keywords: [
    'CATI surveys',
    'computer assisted telephone interviewing',
    'telephonic market research',
    'telephone survey company',
    'B2B telephonic interviews',
    'multi-language CATI call center',
    'phone survey data collection',
  ],
  alternates: {
    canonical: '/telephonic-surveys',
  },
  openGraph: {
    title: 'CATI Telephonic Surveys | Unimrkt Research',
    description:
      '500+ CATI workstations delivering verified, quality-audited quantitative reach across 90+ global markets and 22+ languages.',
    url: 'https://www.unimrkt.com/telephonic-surveys',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/telephonic-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'CATI Telephonic Surveys - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CATI Telephonic Surveys | Unimrkt Research',
    description:
      '500+ CATI workstations delivering verified, quality-audited quantitative reach across 90+ global markets.',
    images: ['/asstes/images/telephonic-hero-banner-img.png'],
  },
};

export default async function TelephonicSurveysPage() {
  const pageData = await getPageBySlug('telephonic-surveys').catch(() => null);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const valuesSection = findSection(pageData, 'sections.values-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const measureSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Human Conversations')
  );
  const qualitySection = sections.find(
    (s) => s.__component === 'sections.values-grid' && (s.heading?.includes('Quality') || s.kicker?.includes('QUALITY'))
  );
  const canMeasureSection = sections.find(
    (s) => s.__component === 'sections.research-reach'
  );
  const processSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Process')
  );

  const overviewSection = sections.find((s) => s.__component === 'sections.callout-box');
  const editorialSection = sections.find(
    (s) => s.__component === 'sections.rich-text-block' || s.__component === 'sections.callout-box'
  );

  return (
    <>
      <TelephonicHero dynamicHero={heroSection} />
      <ResearchImpact dynamicMetrics={metricsSection} />
      <TelephonicOverview dynamicOverview={overviewSection} />
      <WhyTelephonic dynamicValues={valuesSection} />
      <TelephonicProcess
        processSteps={processSection?.cards || []}
        title={processSection?.heading}
        description={processSection?.description}
      />
      <TelephonicCanMeasure items={canMeasureSection?.cards || []} dynamicSection={canMeasureSection || measureSection} />
      <QualityFirst
        qualityPoints={qualitySection?.values || []}
        kicker={qualitySection?.kicker}
        title={qualitySection?.heading}
        text={qualitySection?.description}
      />
      <MeasureSection
        accordionPanels={measureSection?.cards || []}
        kicker={measureSection?.kicker}
        title={measureSection?.heading}
        subtext={measureSection?.description}
      />
      <CommonBlogSection />
      <TelephonicFaq dynamicFaq={faqSection} />
      <InsightsEditorial
        kicker={editorialSection?.kicker || 'About Telephonic Surveys'}
        title={editorialSection?.heading || editorialSection?.title || 'Direct Conversations. Deeper Insights.'}
        paragraph1={editorialSection?.description}
      />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
