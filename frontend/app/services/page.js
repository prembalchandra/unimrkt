import ServicesHero from './sections/ServicesHero';
import ServicesAboutOverview from './sections/ServicesAboutOverview';
import EndToEndSolutions from './sections/EndToEndSolutions';
import WhyChooseUs from './sections/WhyChooseUs';
import ServicesWorkflow from './sections/ServicesWorkflow';
import ServicesQuestionCTA from './sections/ServicesQuestionCTA';
import ResearchReachSection from './sections/ResearchReachSection';
import ServicesIndustriesExpertise from '../../components/ServicesIndustriesExpertise';
import CaseStudiesImpactCta from './sections/CaseStudiesImpactCta';
import CommonTrustedPartnersTestimonials from '../../components/CommonTrustedPartnersTestimonials';
import CommonBlogSection from '../../components/CommonBlogSection';
import ServicesFaq from './sections/ServicesFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'End-to-End Market Research Services | Unimrkt Research',
  description:
    'Comprehensive qualitative and quantitative research services, CATI telephone surveys, CAWI online panels, survey programming, data analytics, and reporting.',
  keywords: [
    'market research services',
    'qualitative research services',
    'quantitative market research',
    'CATI telephone surveys',
    'survey programming',
    'data collection services',
    'B2B market research',
    'consumer research solutions',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'End-to-End Market Research Services | Unimrkt Research',
    description:
      'Comprehensive qualitative and quantitative research services, CATI telephone surveys, CAWI online panels, and market intelligence solutions.',
    url: 'https://www.unimrkt.com/services',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/services-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'End-to-End Market Research Services | Unimrkt Research',
    description:
      'Comprehensive qualitative and quantitative research services, CATI telephone surveys, CAWI online panels, and market intelligence solutions.',
    images: ['/asstes/images/services-hero-banner-img.png'],
  },
};

export default async function ServicesPage() {
  const pageData = await getPageBySlug('services').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <ServicesHero dynamicHero={heroSection} />
      <ServicesAboutOverview />
      <EndToEndSolutions />
      <WhyChooseUs />
      <ServicesWorkflow />
      <ServicesQuestionCTA dynamicCta={ctaSection} />
      <ResearchReachSection
        kicker={metricsSection?.kicker || 'Our Coverage'}
        title={metricsSection?.heading || 'Research Reach That Goes Beyond Markets'}
        description={metricsSection?.description}
      />
      <ServicesIndustriesExpertise />
      <CaseStudiesImpactCta />
      <CommonTrustedPartnersTestimonials />
      <CommonBlogSection />
      <ServicesFaq dynamicFaq={faqSection} />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
