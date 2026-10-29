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

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

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
      <TelephonicFaq />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
